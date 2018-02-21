var express = require('express');
var router = express.Router();
var execFile = require('child_process').execFile;

router.route('/:def?')
   .get(function(req, res) { 

      PSBuildDirCall(req.params.def)      
      .then(result => {
         if(result.indexOf("True") === 0) {
            result = result.trim();
            let resultArray = result.split("\n");
            resultArray = resultArray.map(x => x.trim());
            res.json({success:"True", folders:resultArray.slice(2)})
         } else {
            res.json({success:"False", error: result.split("---")[1]})
         }},
         error =>  {res.json({success:"false", error: error.message})})
         
   }
);	

function PSBuildDirCall(definition) {

   if(definition === undefined) {
      definition = ""
   }

   console.log(definition)

   return new Promise(function(resolve, reject) {
      execFile("powershell.exe", (["-F", __dirname + "/../scripts/BuildsDirUtils.ps1", definition]), 
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

