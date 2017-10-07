var mysql = require('./MySQL');
var uuidv4 = require("uuid/v4");

var self = this;

exports.register = function(email, password, fn, ln, dob, gender, callback){

    var pk_Id = uuidv4();
    var sqlQuery = "insert into users (userId, userEmail, userPassword, userFirstName, userLastName, userBDate, userGender) values ('"+pk_Id+"', '"+email+"', '"+password+"', '"+fn+"', '"+ln+"', '"+dob+"', '"+ gender +"')";

    mysql.saveData(sqlQuery, function(err,results) {

        console.log(results);
        if (err || (results.affectedRows === 0)) {
            console.log('error in register');
            callback(err, results);
        } else {
            callback(err, results);
        }
    });
};

exports.getUserDetails = function(email, callback){

    var getUser="select * from users where userEmail='"+ email +"'";

    mysql.fetchData(function(err,results){
        if (err ) {
            console.log('error in login');
            callback(err, results);
        } else {
            callback(err, results);
        }
    }, getUser);
};

exports.insertFileDetails = function(fileID, fileName, callback){

    var filedetails="insert into filedetails (fileDetailsID, fileName, fileCreatedDt) values ('"+fileID+"', '"+fileName+"', '"+new Date().toISOString().slice(0, 10)+"')";

    mysql.saveData(filedetails, function(err,results){
        if (err ) {
            throw err;
        } else {
            callback(err, results);
        }
    });
};

exports.insertUserFileRelation = function(relationID,fileID, userID, callback){

    var relationdetails="insert into userfile_relation (userFile_relationID, userfile_UserID, userfile_fileID) values ('"+relationID+"', '"+userID+"', '"+fileID+"')";

    mysql.saveData(relationdetails, function(err,results){
        if (err ) {
            throw err;
        } else {
            callback(err, results);
        }
    });
};

exports.saveFileDetails = function(username,fileNames,callback){
    try{
        this.getUserDetails(username,function (err,result) {
            if(err){
                throw err;
            }else {
                if(result.length === 1){
                    var userID = result[0].userId;
                    filenameArr = fileNames.split('/');
                    filenameArr.map( function (fileName) {
                        if(fileName !== ""){
                            var pk_Id = uuidv4();
                            self.insertFileDetails(pk_Id, fileName, function (err,results) {
                                if(!err){
                                    var relID = uuidv4();

                                    self.insertUserFileRelation(relID, pk_Id, userID, function (err,results) {
                                        if(!err)callback(200);
                                        else callback(400);
                                    })
                                }else {
                                    callback(400)
                                }
                            })
                        }
                    })
                }else{
                    callback(400)
                }
            }
        })
    }
    catch(err){
        console.log(err);
        callback(400)
    }
};


exports.listUserFiles = function(username,callback){
    try{
        this.getUserDetails(username,function (err,result) {
            if(err){
                throw err;
            }else {
                if(result.length === 1){
                    var userID = result[0].userId;
                    self.listUserFilesRelation(userID,function (err, results) {
                        if(!err){
                            if(results.length > 0 ){
                                var filearr = results.map( function (result) {
                                    self.listUserFileDetails(result.userfile_fileID, function (err, detailresults) {
                                        if(!err){
                                            if(detailresults.length ===1){
                                                return {name: detailresults.fileName, createDt: detailresults.fileCreatedDt, id: detailresults.fileDetailsID}
                                            }
                                        }else{
                                            callback(err);
                                        }
                                    })
                                })
                                callback(err,filearr);
                            }else{
                                callback(err);
                            }
                        }else{
                            throw err;
                        }
                    })
                }else{
                    callback(400)
                }
            }
        })
    }
    catch(err){
        console.log(err);
        callback(400)
    }
};


exports.listUserFilesRelation = function(userID,callback){
    var getFileIDs="select userfile_fileID from userfile_relation where userfile_UserID='"+ userID +"'";

    mysql.fetchData(function(err,results){
        if (err ) {
            throw err;
        } else {
            callback(err, results);
        }
    }, getFileIDs);
};


exports.listUserFileDetails = function(fileID,callback){
    var getFileDetails="select * from filedetails where fileDetailsID = '"+ fileID +"' ";

    mysql.fetchData(function(err,results){
        if (err ) {
            throw err;
        } else {
            callback(err, results);
        }
    }, getFileDetails);
};