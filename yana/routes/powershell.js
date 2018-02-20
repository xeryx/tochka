"use strict"

var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;
var execFile = require('child_process').execFile;


router.route('/')
   .get(function(req, res) { 
      return res.json({"success":"true","data":""});
   })	

   .post(function(req, res) {
      if(validate(req.body.cmd)) {
         let proc = spawn("cmd.exe", ["/c", "powershell.exe " + req.body.cmd], {detached: true});
         return res.send({success:"true", "output": "command sent: " + req.body.cmd});
      }
      else {
         return res.send({success:"false", "error":"Invalid command: " + req.body.cmd});
      }
   });

router.route('/sync/')
   .post(function(req, res) {
      execFile("powershell.exe",req.body.cmd.split(" "),  function(error, stdout, stderr) {
         if(!error) {
             return res.json({"success":"true", "output":stdout.trim()});
         }
         else {
             return res.json({"success":"false", "error":error});
         }
      });  
   });

var validate = function(cmd) {
   if(cmd.length > 0) {
      return true;
   } else {
      return false;
   }

}

module.exports = router;