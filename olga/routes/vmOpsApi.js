var express = require('express');
var router = express.Router();
var execFile = require('child_process').execFile;

router.route('/')
   .post(function(req, res) { 

      let host = "";
      let vm = "";
      let user = "";
      let passwd = "";
      let snapshot = "";

      switch(req.body.type) {
         case "poweron":
            host = req.body.host;
            vm = req.body.vm;
            user = req.body.user;
            passwd = req.body.passwd;

            PowerCliCall("PowerOn", [host, vm, user ,passwd])
            .then(result => {
               if(result.indexOf("True") === 0) {
                  res.json({success:"True"})
               } else {
                  res.json({success:"False", error: result.split("---")[1]})
               }},
               error =>  {res.json({success:"false", error: error.message})})
            break;

         case "revert":
            host = req.body.host;
            vm = req.body.vm;
            user = req.body.user;
            passwd = req.body.passwd;
            snapshot = req.body.snapshot;

            PowerCliCall("Revert", [host, vm, user ,passwd, snapshot])
            .then(result => {
               if(result.indexOf("True") === 0) {
                  res.json({success:"True"})
               } else {
                  res.json({success:"False", error: result.split("---")[1]})
               }},
               error =>  {res.json({success:"false", error: error.message})})
            break;
            
         case "powerstate":
            host = req.body.host;
            vm = req.body.vm;
            user = req.body.user;
            passwd = req.body.passwd;

            PowerCliCall("PowerState", [host, vm, user ,passwd])
            .then(result => {
               if(result.indexOf("True") === 0) {
                  res.json({success:"True", power:(result.split("---")[1]).trim()})
               } else {
                  res.json({success:"False", error: result.split("---")[1]})
               }},
               error =>  {res.json({success:"false", error: error.message})})
            break;

         default:
            res.json({success:"false", error:"Unknown operation"})
            break;
      }
   }
);	

function PowerCliCall(type, params, callback) {
   return new Promise(function(resolve, reject) {
      execFile("powershell.exe", (["-F", __dirname + "/../scripts/PowerCliApi.ps1", type]).concat(params), 
         function(error, stdout, stderr) {
            if(error) { 
               reject(error)
            } else {
               resolve(stdout)
            }
         }
      )
   });
}

module.exports = router;


