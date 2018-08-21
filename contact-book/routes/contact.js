// routes/contacts.js

const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

//index
router.get("/", function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render("contacts/index", {contacts:contacts});
  });
});

// New
router.get("/new", function(req, res){
  res.render("contacts/new");
});

// create
router.post("/", function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.render("/contacts");
  });
});

// show
router.get("/:id", function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render("contacts/show", {contact:contact});
  });
});

// edit
router.get("/:id/edit", function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err){
    if(err) return res.json(err);
    res.render("/contacts/"+req.params.id);
  });
});

//update
router.put("/:id", function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err){
    if(err) return res.json(err);
    res.redirect("/contacts/"+req.params.id);
  });
});

//destroy
router.delete("/:id", function(req, res){
  Contact.remove({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

module.exports = router;
