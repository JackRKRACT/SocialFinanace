const mysql = require('mysql');

class Database {

    constructor(credentials, ssl) {
        this.host = credentials[4]
        this.port = credentials[5]
        this.user = credentials[6]
        this.password = credentials[7]
        this.ssl = ssl;
        this.connectionTimeout = 30000;
    }

    createConnection() {
        return new Promise((resolve, reject) => {
            this.active = mysql.createConnection({
                host: this.host,
                port: this.port,
                user: this.user,
                password: this.password,
                ssl: {
                    ca: this.ssl
                },
                connectionTimeout: this.connectionTimeout
            });

            if (this.active) {
                resolve("Successfully started connection for MySQL.");
            } else {
                reject("Unable to start new database connection.");
            }
        });
    }

    connectDatabase() {
        return new Promise((resolve, reject) => {
            this.active.connect(function(err) {
                if (err) reject(err);
                //console.log("Connected to Azure MySQL database.");
                resolve("Successfully connected to MySQL database.")
            });
        })
    }

    queryDatabase(sql) {
        return new Promise((resolve, reject) => {
            //console.log("Starting query for " + sql)
            if (this.active) {
                this.active.query(sql, function (err, data) {
                    if (err) reject(err);
                    resolve(data);
                });
            } else {
                reject("Unable to query database.");
            }
        })
    }

    /*
    connectionEnd() {
        this.con.end();
    }

     */
}

module.exports = Database;