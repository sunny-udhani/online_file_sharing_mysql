var ejs = require("ejs");
var mysqlDAO = require('./dropboxDAO');
var bcrypt= require('bcrypt-nodejs');
var multer = require("multer");
var fse = require('fs-extra');
var fs = require('fs');
var multer = require('multer');
var glob = require('glob');
var dirTree = require('directory-tree');
var async = require("async");
var fileName = "";
var self = this;
var uploadPath = "";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(uploadPath);
        cb(null, ('./'+ uploadPath))
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
    var edu = req.param("edu");
    var work = req.param("work");
    var inter = req.param("inter");

    mysqlDAO.register(id,pwd,fn,ln,bdate,gender,edu,work, inter, function(err,results){
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

validateFolderExists = function (path,callback) {
    if(path === undefined){
        callback(400);
    }
    var dir = './' + path;

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
                mysqlDAO.saveFileDetails(req.aaj.username, fileName, uploadPath, function (result) {
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
    if (req.aaj.username !== undefined || req.aaj.username !== "") {
        validateFolderExists(req.aaj.username, function (folderExists) {
            if(folderExists === 200){
                console.log("filespath : " + req.param("filesPath"));
                var filepath = req.param("filesPath");
                if(filepath === "" || filepath === undefined){
                    filepath = "./" + req.aaj.username;
                }

                var sharepath = req.param("sharePath");


                listUserFiles(req, filepath, function (err, fileList) {
                    if(err){
                        throw err;
                    }else {
                        listSharedFiles(req, sharepath, function (err, sharedFilesList) {
                            if(err){
                                throw err;
                            }else {
                                var result = {userFileList: fileList, sharedFileList: sharedFilesList};
                                res.status(200).send(result);
                            }
                        });
                    }
                });

                // validateFolderExists(path, function (folderExists) {
                //     if(folderExists === 200) {
                //         mysqlDAO.getUserDetails(req.aaj.username, function (err, userResults) {
                //             if (err) {
                //             } else {
                //                 if (userResults.length === 1) {
                //                     var userID = userResults[0].userId;
                //                     mysqlDAO.listUserFilesRelation(userID, function (err, relations) {
                //                         if (err) {
                //                         } else {
                //                             if (relations.length !== 0) {
                //                                 var fileList = [{}];
                //                                 console.log("relation len: " + relations.length);
                //                                 async.forEachOf(relations, function(relation, index, callback){
                //                                     mysqlDAO.listUserFileDetails(relation.userfile_fileID, path, function (err, fileDetails) {
                //                                         fileList[0] = {name: "..", path: path};
                //                                         if (fileDetails.length === 1) {
                //                                             if (fileDetails[0].fileName !== "") {
                //                                                 fileList[index + 1] = {
                //                                                     name: fileDetails[0].fileName,
                //                                                     createDt: fileDetails[0].fileCreatedDt,
                //                                                     id: fileDetails[0].fileDetailsID,
                //                                                     path: fileDetails[0].filePath,
                //                                                     type: fileDetails[0].fileType
                //                                                 };
                //                                             }
                //                                         }
                //                                         callback();
                //                                     })
                //                                 }, function(err){
                //                                     console.log(fileList);
                //                                     res.status(200).send(fileList)
                //                                 });
                //                             }
                //                         }
                //                     })
                //                 }
                //             }
                //         })
                //     }else{
                //         console.log("no such folder")
                //     }
                // })
            }else{
                res.send(200).end();
            }
        })
    }else{
        res.status(400).send();
    }
};

exports.makeDirectory = function (req, res) {
    if(req.aaj.username !== undefined || req.aaj.username !== ""){
        console.log(req);
        var path = req.param('path');
        var dir = req.param('dir');
        if(path === "" || path === undefined){
            path = "./"+req.aaj.username;
        }
        var createPath = path + '/' + dir;
        fs.mkdirSync(createPath);
        if (!fs.existsSync(createPath)){
            res.status(400).end();
        }else{
            mysqlDAO.saveFolder(req.aaj.username,path,req.param('dir'),function (results) {
                if(results === 200) res.status(200).send();
            })
        }
    }else{
        res.status(400).end();
    }
};

exports.setPath = function (req, res) {
    if(req.aaj.username !== undefined || req.aaj.username !== ""){
        console.log(req);
        var path = "./"+req.aaj.username +"/" + req.param('path');
        if (!fs.existsSync(path)){
            res.status(400).end();
        }else{
            self.listFiles()
        }
    }else{
        res.status(400).end();
    }
};

exports.setUploadPath = function (req,res) {
    if (req.aaj.username !== undefined || req.aaj.username !== "") {
        uploadPath = '';
        console.log("upload path set");
        console.log(req.body);
        if (req.param('path') === null || req.param('path') === '' || req.param('path') || req.param('path') === undefined){
            uploadPath = './' + req.aaj.username;
        }else {
            uploadPath = req.param('path');
        }
        res.status(200).end();
    }
};

exports.doShare = function (req,res) {
    if (req.aaj.username !== undefined || req.aaj.username !== "") {
        console.log("input emails: " + req.param('emails'));
        var emails = req.param('emails');
        var fileId = req.param('fileId');

        try {
            mysqlDAO.getUserDetails(req.aaj.username, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 1 && result[0].userId !== "") {
                        var fromUserID = result[0].userId;
                        var emailArr = emails.split(';');
                        async.forEachOf(emailArr, function(toEmail, index, cb) {
                            if (toEmail !== "") {
                                mysqlDAO.getUserDetails(toEmail, function (err, results) {
                                    if (!err) {
                                        if (results.length === 1 && results[0].userId !== "") {
                                            var toUserID = results[0].userId;
                                            if (fromUserID !== "" && toUserID !== "") {
                                                mysqlDAO.insertShareDetails(fromUserID, toUserID, fileId, function (err, results1) {
                                                    cb()
                                                })
                                            }else{console.log("2")}
                                        }
                                    }
                                })
                            }else{
                                console.log("3")
                            }
                        }, function (err) {
                            if (err){
                                console.log("err" + err);
                                res.status(400).end();
                            }else {
                                res.status(200).send();
                            }
                        })
                    }else{console.log("1")}
                }
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).send();
        }
    }
};

listUserFiles = function (req, path, cb) {
    validateFolderExists(path, function (folderExists) {
        if(folderExists === 200) {
            mysqlDAO.getUserDetails(req.aaj.username, function (err, userResults) {
                if (err) {
                    throw err;
                } else {
                    if (userResults.length === 1) {
                        var userID = userResults[0].userId;
                        var fileList = [{}];
                        mysqlDAO.listUserFilesRelation(userID, function (err, relations) {
                            if (err) {
                            } else {
                                if (relations.length !== 0) {
                                    console.log("relation len: " + relations.length);
                                    async.forEachOf(relations, function(relation, index, callback){
                                        mysqlDAO.listUserFileDetails(relation.userfile_fileID, path, function (err, fileDetails) {
                                            fileList[0] = {name: "..", path: path};
                                            if (fileDetails.length === 1) {
                                                if (fileDetails[0].fileName !== "") {
                                                    fileList[index + 1] = {
                                                        name: fileDetails[0].fileName,
                                                        createDt: fileDetails[0].fileCreatedDt,
                                                        id: fileDetails[0].fileDetailsID,
                                                        path: fileDetails[0].filePath,
                                                        type: fileDetails[0].fileType
                                                    };
                                                }
                                            }
                                            callback();
                                        })
                                    }, function(err){
                                        //res.status(200).send(fileList)
                                        cb(err,fileList)
                                    });
                                }else{
                                    cb(err,fileList)
                                }
                            }
                        })
                    }
                }
            })
        }else{
            console.log("no such folder")
        }
    })
};

listSharedFiles = function (req, path, cb) {
    mysqlDAO.getUserDetails(req.aaj.username, function (err, userResults) {
        if (err) {
        } else {
            if (userResults.length === 1) {
                var userID = userResults[0].userId;
                var fileList = [{}];
                mysqlDAO.listSharedFilesId(userID, function (err, fileIds) {
                    if (err) {
                    } else {
                        if (fileIds.length !== 0) {
                            async.forEachOf(fileIds, function(file, index, callback){
                                mysqlDAO.listUserFileDetails(file.fileDetailsId, path, function (err, fileDetails) {
                                    fileList[0] = {name: "..", path: path};
                                    if (fileDetails.length === 1) {
                                        if (fileDetails[0].fileName !== "") {
                                            fileList[index + 1] = {
                                                name: fileDetails[0].fileName,
                                                createDt: fileDetails[0].fileCreatedDt,
                                                id: fileDetails[0].fileDetailsID,
                                                path: fileDetails[0].filePath,
                                                type: fileDetails[0].fileType
                                            };
                                        }
                                    }
                                    callback();
                                })
                            }, function(err){
                                console.log(fileList);
                                //res.status(200).send(fileList)
                                cb(err,fileList)
                            });
                        }else{
                            cb(err,fileList)
                        }
                    }
                })
            }
        }
    })
};

exports.userDetFetch = function (req,res) {
    if (req.aaj.username !== undefined || req.aaj.username !== "") {
        mysqlDAO.fetchUser(req.aaj.username, function (err, results) {
            if(err){
                res.status(400).end();
            }else{
                console.log(results);
                res.status(200).send(results);
            }
        })
    }else{
        res.status(404).end();
    }
}


exports.userdata = function (req,res) {
    var id = req.param("userEmail");
    if(id !== '' && id !== undefined && id !== null ){
        mysqlDAO.fetchUser(id, function (err, results) {
            if(err){
                res.status(400).end();
            }else{
                console.log(results);
                res.status(200).send(results);
            }
        })
    }else{
        res.status(404).end();
    }
};