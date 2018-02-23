import './styles/Alyona.css';
import React, { Component } from 'react';
import UserFormCmp from "./modules/UserFormCmp"
import {
   getBuildDefinitions,
} from './ServerApi'

class Alyona extends Component {

   constructor(props) {
      super(props); 

         this.state = {
            userParams: {
               vmName:"",
               domain:"sysk8.local",
               mdsVmName:"",
               definition:"", 
               build:"",
               userName:"", 
               password:"",
            }, 

            definitions:[], 
            builds:[], 
            selectedDomain:0, 
            selectedDefinition:0, 
            selectedBuild:0

         };

   }

   render() {

      let userFormCmp = <UserFormCmp
         domainList={["sysk8.local", "perftestmv.local"]}
         definitionList={this.state.definitions}
         buildList={this.state.builds}

         domainIndex={this.state.selectedDomain}
         definitionIndex={this.state.selectedDomain}
         buildIndex={this.state.selectedDomain}
      />

      return ( 
            <div style={{ margin: "20px 0px 10px 0px" }}>
               {userFormCmp}
            </div>

      )
   }

   componentDidMount() {
      getBuildDefinitions()
         .then(response => {
            this.setState({
               definitions: response.folders               
            });
         })
         .catch(error => alert("Error: " + error.message + "\n" + error.stack))
   }
    
}

export default Alyona;
