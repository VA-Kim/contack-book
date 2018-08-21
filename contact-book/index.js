var express = require("express");
var mongoose = require("mongoose");
var bodyParse = require("body-parser");
var config = require('./config');
var app = express();

// DataBase
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500 , // Reconnect every 500ms
    poolSize: 10 , // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    promiseLibrary: require('bluebird')
}

mongoose.connect(process.env.MONGO_DB, options );
var db = mongoose.connection; // 2

// 4
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

// 3﻿
db.once("open", function(){
 console.log("DB connected");
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// Port setting
app.listen(3000, function(){
 console.log("server on!");
});
