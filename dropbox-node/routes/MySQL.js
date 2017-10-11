var ejs= require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'sunny',
        password : 'sunny',
        database : 'dropbox',
        port	 : 3306
    });
    return connection;
}


function fetchData(callback,sqlQuery){

    console.log("\nSQL Query : "+sqlQuery);

    var connection=getConnection();

    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else
        {	// return err or result
            callback(err, rows);
        }
    });
    connection.end();
}

function saveData(query, callback) {
    console.log("\nSQL Query::"+query);

    var connection=getConnection();

    connection.query(query, function(err, rows) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else
        {	// return err or result
            callback(err, rows);
        }
    });
    connection.end();

}

exports.fetchData=fetchData;
exports.saveData=saveData;