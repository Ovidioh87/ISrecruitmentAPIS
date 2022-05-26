const mysql = require('mysql');
const mysqlConn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'recruitment'

});
mysqlConn.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Conexión establecida con la DB');
    }
});

module.exports = mysqlConn;