"use strict"

var express = require('express');
var router = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     //cb(null, __dirname + '/../uploads/');
     cb(null, __dirname);
   },
   filename: (req, file, cb) => {
      cb(null, "home.js");
   },
});
const upload = multer({ storage });

router.post('/', upload.single('fileToUpload'), function(req, res) {
   return res.json({success:"true"});
});


module.exports = router;