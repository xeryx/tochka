import './styles/Alyona.css';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import myTheme from './styles/myTheme';
import UserFormCmp from "./modules/UserFormCmp"

class Alyona extends Component {

   constructor(props) {
      super(props); 

         this.state = {

         };

   }

   render() {

      let userFormCmp = <UserFormCmp
      />

      return ( 
         <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}><div>
            <div style={{ margin: "20px 0px 10px 0px" }}>
               {userFormCmp}
            </div>
         </div></MuiThemeProvider>
      )
   }
    
}

export default Alyona;
