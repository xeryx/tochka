
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class UserFormCmp extends Component {


   render() {  

      let componentContent =
         <TextField 
            id="vmName"
            hintText="aska01"
            floatingLabelText="Server Name"
            floatingLabelFixed={true}
         />

       return(componentContent)
        
    }


}       


export default UserFormCmp;
