var express = require("express");
var mongoose = require("mongoose");
var bodyParse = require("body-parser");
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

//Routes
app.get("/contact/:id", function(req,res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render("contact/show", {contact:contact});
  });
});

app.get("/contacts/:id/edit", function(req,res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts/"+req.params.id);
  });
});

app.put("/contacts/:id", function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts/"+req.params.id);
  });
});

app.delete("/contacts/:id", function(req, res){
  Contact.remove({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

// Port setting
app.listen(3000, function(){
 console.log("server on!");
});
