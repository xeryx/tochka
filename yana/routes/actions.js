"use strict"

var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;


router.route('/')
.get(function(req, res) { 
   return res.json({"success":"true","data":"10 4"});
})	

.post(function(req, res) {

   let resJson = {}

   switch(req.body.type) {
      case "deploy":
         let cmdString = ""
         if(req.body.hasOwnProperty("buildPath")) {
            cmdString = cmdString + " -buildPath " + req.body.buildPath
         } else {
            return res.json({success:"false", data:"Mandatory parameters missing"})
         }       
         if(req.body.hasOwnProperty("domain")) {
            cmdString = cmdString + " -domain " + req.body.domain
         }
         if(req.body.hasOwnProperty("machineRole")) {
            cmdString = cmdString + " -machineRole " + req.body.machineRole
         }
         if(req.body.hasOwnProperty("primaryCb")) {
            cmdString = cmdString + " -primaryCb " + req.body.primaryCb
         }
         
         let proc = spawn('cmd.exe', ['/c', 'powershell.exe -File c:\\temp\\Main.ps1 ' + cmdString], 
                           {detached: true}
                        );

         return res.send({success:"true", data:cmdString});

      
         
      default:
         return res.json({success:"false", data:"Request not recognized"});
  }


});


module.exports = router;