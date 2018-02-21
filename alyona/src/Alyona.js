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
            userParams: {
               vmName:"",
               domain:"sysk8.local",
               mdsVmName:"",
               definition:"Synapse5.4.200", 
               build:"Synapse5.4.200_20180221.1",
               userName:"", 
               password:"",
            }, 

            definitions:[], 
            builds:[]


         };

   }

   render() {

      let tempDomainList = ["sysk8.local", "sysk3.com" ,"perftestmv.local"];
      let tempDefinitonList = ["Synapse5.5.000", "Synapse5.4.200", "Synapse5.4.100"];
      let tempBuildList = ["Synapse5.4.200_20180221.1", "Synapse5.4.200_20180220.1", "Synapse5.4.200_20180219.1"]

      let userFormCmp = <UserFormCmp
         domainList={tempDomainList}
         definitionList={tempDefinitonList}
         buildList={tempBuildList}

         domainIndex={tempDomainList.indexOf(this.state.userParams.domain)}
         definitionIndex={tempDefinitonList.indexOf(this.state.userParams.definition)}
         buildIndex={tempBuildList.indexOf(this.state.userParams.build)}


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
