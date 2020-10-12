function getConnection() {
    let conn = mysql.createConnection({
        host:   config.host,
        user:   config.user,
        password:   config.password,
        database:   config.database,
        port:   config.port
    });
    conn.connect(function(err) {
        if(err) {
            console.log('mysql connection error : ' + err);
        }
    });
    return conn;
}