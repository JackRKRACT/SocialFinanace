import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const PORT = 4000;
const Database = require('./database');
const app = express();

app.use("^/$", (req, res, next) => {
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Some error happened");
        }
        return res.send(
            data.replace(
                '<div id="root"></div>',
                `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
            )
        );
    });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.post('/stock',(req,res) => {
    req.on('data', chunk => {
        let sanitized = chunk.toString().match(/^[A-Z]*/);
        let databasePromise = databaseSetup();
        databasePromise.then((db) => {
            db.queryDatabase("SELECT * from sfinance.stock where sTicker = \'" + sanitized + "\'").then((queryResult => {
                res.send(queryResult);
                console.log(queryResult);
            })).catch((err) => {
                console.log(err);
            })
        })
    });
})

app.post('/subreddits',(req,res) => {
    req.on('data', chunk => {

        let databasePromise = databaseSetup();
        databasePromise.then((db) => {
            db.queryDatabase("SELECT redditName from sfinance.subreddits").then((queryResult => {
                //let clean = JSON.parse(queryResult.toString());
                //console.log(clean)
                res.send(queryResult);
                //console.log("List of subreddits rn " + clean);
            })).catch((err) => {
                console.log(err);
            })
        })
    });
})

app.post('/login',(req,res) => {
    req.on('data', chunk => {
        let templogin = JSON.parse(chunk.toString());
        console.log(templogin.username);
        console.log(templogin.password);
        let databasePromise = databaseSetup();
        databasePromise.then((db) => {
            db.queryDatabase("SELECT username from sfinance.accountinfo WHERE pass = \'" + templogin.pass + "'\ AND username =\'" + templogin.username + "\'").then((queryResult => {
                res.send(templogin.username);
                console.log(queryResult);
            })).catch((err) => {
                console.log(err);
            })
        })
    });
})

app.post('/register',(req,res) => {
    req.on('data', chunk => {
        let templogin = JSON.parse(chunk.toString());
        console.log(templogin.first);
        console.log(templogin.last);
        let first = "defaultfirst";
        let last = "defaultlast";
        console.log(templogin.username);
        console.log(templogin.password);
        let databasePromise = databaseSetup();
        databasePromise.then((db) => {
            db.queryDatabase('INSERT INTO sfinance.accountinfo (accountID, fName, lName, username, pass) VALUES ' +
                '(\'' + Math.floor(Math.random()*100) + '\',\'' + first + '\',\'' + last + '\',\'' + templogin.username + '\',\'' + templogin.password).then((queryResult => {
                res.send(templogin.username);
                console.log(queryResult);
            })).catch((err) => {
                console.log(err);
            })
        })
    });
})

app.listen(PORT, '127.0.0.1', () => {
    console.log(`App launched on ${PORT}`);
});

function databaseSetup() {
    return new Promise((resolve, reject) => {
        let getCreds = promiseRead('./server/credentials.txt');
        let getSSL = promiseRead('./server/DigiCertGlobalRootCA.crt');
        let dataArray = Promise.all([getCreds, getSSL]);
        dataArray.then((values => {
            let db = new Database(values[0].toString().split(","), values[1]);

            let createConn = db.createConnection();
            let connectDB = db.connectDatabase();

            Promise.all([createConn, connectDB]).then((values) => {
                console.log(values[0]);
                console.log(values[1]);
                resolve(db);
                reject("Unable to setup database.");
            })
        }));
    });
}

function promiseRead(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}