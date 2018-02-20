var express = require('express');
var router = express.Router();
var execFile = require('child_process').execFile;

router.route('/')
   .post(function(req, res) { 

      let server = req.body.server;
      let version = req.body.version;

      if((!server) || (!version)) {
         res.json({success:"false", error: "Bad parameters"})
         return;
      }

      let filePathsArray = [];

      try {
         filePathsArray = walkSync(__dirname + "/../local/" + version + "/");
      }
      catch(err) {
         res.json({success:"false", error: err.message})
         return;
      }

      let uploadFilePromises = [];
      for(let i = 0; i < filePathsArray.length; i++) {
         uploadFilePromises.push(PSFileUploadCall(server, filePathsArray[i]))
      }

      Promise.all(uploadFilePromises)
      .then(result => {
         let successGlobal = result.every(CheckPSSuccess)

         if(successGlobal) {
            res.json({success:"True"})
         } else {
            res.json({success:"False", error: "Error uploading automation files. ", details:result})
         }},
         error =>  {res.json({success:"False", error: error.message})}
      )
           
   }
);	

function PSFileUploadCall(server, filePath) {

   let uri = "http://" + server + ":43962/upload/"
   return new Promise(function(resolve, reject) {
      execFile("powershell.exe", (["-F", __dirname + "/../scripts/FileUploadApi.ps1", uri, filePath]), 
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

function CheckPSSuccess(psOutput) {
   console.log(psOutput)
   return (psOutput.indexOf("True") === 0)

}

function walkSync(dir, filelist) {
   var path = path || require('path');
   var fs = fs || require('fs'),
       files = fs.readdirSync(dir);
   filelist = filelist || [];
   files.forEach(function(file) {
       if (fs.statSync(path.join(dir, file)).isDirectory()) {
           filelist = walkSync(path.join(dir, file), filelist);
       }
       else {
           filelist.push(path.join(dir, file));
       }
   });
   return filelist;
};

module.exports = router;

