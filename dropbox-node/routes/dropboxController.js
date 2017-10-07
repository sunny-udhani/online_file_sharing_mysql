var ejs = require("ejs");
var mysqlDAO = require('./dropboxDAO');
var bcrypt= require('bcrypt-nodejs');
var multer = require("multer");
var fse = require('fs-extra');
var fs = require('fs');
var multer = require('multer');
var glob = require('glob');
var dirTree = require('directory-tree');
var fileName = "";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, ('./'+ req.aaj.username))
    },
    filename: function (req, file, cb) {
        console.log("file details: "+ JSON.stringify(file));
        fileName += file.originalname+"/";
        cb(null, file.originalname)
    }
});

var upload = multer({ storage : storage}).any();


exports.registerUser = function(req, res){


    var id = req.param("userEmail");
    var pwd = bcrypt.hashSync(req.param("password"));
    var fn = req.param("firstName");
    var ln = req.param("lastName");
    var bdate = req.param("dob");
    var gender = req.param("gender");

    mysqlDAO.register(id,pwd,fn,ln,bdate,gender, function(err,results){
        if(!err){
            if (results.affectedRows === 1) {
                req.aaj.username = id;
                req.aaj.isLoggedIn = true;

                var dir = './' + id;

                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                console.log(req.aaj);
                console.log("valid registration");
                res.status(200).json({"results": results});
            }
            else {
                req.aaj.destroy();
                console.log('Session Destroyed');
                console.log("Error occurred");
                res.status(400).send(err);
            }
        }else{
            console.log("error on register:" + err);
            res.status(500);
            res.end("Invalid login");
        }
    });
};

exports.validateLogin = function(req, res){

    // check user already exists
    var pwd = req.param("inputPassword");
    var email = req.param("inputUsername");

    console.log("login session data: "+ req.aaj);

    mysqlDAO.getUserDetails(email,function(err,results){
        if(err)
        {
            console.log("Error occurred:"+err);
            res.status(500).send(err);
        }
        else if(results.length === 1)
        {
            console.log("results: "+results[0]);
            if(bcrypt.compareSync(pwd, results[0].userPassword))
            {
                console.log("valid Login");
                validateFolderExists(email, function (folderExists) {
                    if(folderExists === 200){
                        req.aaj.username = req.param("inputUsername");
                        req.aaj.userId = results[0].userId;
                        req.aaj.isLoggedIn = true;

                        console.log("Session initialized: "+ JSON.stringify(req.aaj.username));

                        json_responses = {"results" : results};
                        res.status(200).json(json_responses);
                    }else{
                        req.aaj.destroy();
                        console.log('Session Destroyed');
                        console.log("no folder exists");
                        res.status(400).send(err);
                    }
                });

            }
            else {
                req.aaj.destroy();
                console.log('Session Destroyed');
                console.log("password mismatch");
                res.status(400).send(err);
            }
        }
        else{
            res.status(400).send(err);
        }
    });
};

exports.logout = function(req, res){

    req.aaj.destroy();
    console.log('Session Destroyed');
    res.status(200).send();

};

validateFolderExists = function (id,callback) {
    var dir = './' + id;

    if (!fs.existsSync(dir)){
        callback(400)
    }else{
        callback(200)
    }
};

exports.fileUpload = function (req, res) {
    // console.log(req.aaj.username);
    // console.log("req body: "+JSON.stringify(req.body));
    if (req.aaj.username !== undefined || req.aaj.username !== "") {
        upload(req,res, function (err) {
            if(err) {
                console.log("no req.file:");
                res.status(400).send();
            }
            else{
                console.log(fileName);
                mysqlDAO.saveFileDetails(req.aaj.username,fileName, function (result) {

                        res.status(result).send();
                        fileName = "";

                })
            }
        });
    }else {
        console.log("no session")
    }
};

exports.listFiles = function (req, res) {
    //console.log(req.aaj.username);
    if (req.aaj.username !== undefined || req.aaj.username !== "") {
        validateFolderExists(req.aaj.username, function (folderExists) {
            if(folderExists === 200){
                mysqlDAO.listUserFiles(req.aaj.username, function (err,results) {
                    if(err){
                        res.status(400).end();
                    }else{
                        if(results.length > 0){
                            res.status(200).send(results);
                        }else{
                            console.log("no files yet");
                            res.status(200).end();
                        }
                    }
                })
            }else{
                res.status(400).end();
            }
        });
    }
    else {
        console.log("no session")
    }
};