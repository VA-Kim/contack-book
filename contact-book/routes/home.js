//routes/home.js

const express = require("express");
const router = express.Router();

router.get("/", function(req, res){
  res.redirect("/contacts");
});

module.exports = router;
