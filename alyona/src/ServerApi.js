//Function that retrieves the contents of the response json
function saveInLocalStorage(dataJson, requestPath) {
   try{
      localStorage.setItem(requestPath,JSON.stringify(dataJson))
   }
   catch(err){}; 
};

export function getBuildDefinitions() {
   let path = '/builds';
   return(
        fetch(path, {
            method: "get",
        })
        .then(response => response.json())
        .then(responseJson => new Promise(
            function(resolve, reject) {
                if(responseJson.success !== "false") {
                  resolve(responseJson);
                }
                else {
                  reject(Error(JSON.stringify(responseJson.error)));
                }
            })
        )
    );
};

