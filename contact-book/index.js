var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
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
// mongoose.connect('mongodb://ickim:167357aa@ds127342.mlab.com:27342/todo', options );
var db = mongoose.connection; // 2

db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

db.once("open", function(){
 console.log("DB connected");
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Routes
app.use("/", require("./routes/home")); //1
app.use("/contacts", require("./routes/contact")); //2

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log("server on! http://localhost:"+port);
});
