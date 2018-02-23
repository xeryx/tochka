
import React, { Component } from 'react';

class UserFormCmp extends Component {


   render() {  

      let domainItems = [];
      let definitionItems = [];
      let buildItems = [];

      
      for (let i = 0; i < this.props.domainList.length; i++ ) {
         domainItems.push(<option value={this.props.domainList[i]} key={i}>{this.props.domainList[i]}</option>);
      }

      for (let i = 0; i < this.props.definitionList.length; i++ ) {
         definitionItems.push(<option value={this.props.definitionList[i]} key={i}>{this.props.definitionList[i]}</option>);
      }

      for (let i = 0; i < this.props.buildList.length; i++ ) {
         buildItems.push(<option value={this.props.buildList[i]} key={i}>{this.props.buildList[i]}</option>);
      }


      let componentContent = <div>

         <form>
         Server Name:<br/>
         <input type="text" name="server"/>
         <br/>
         <br/>
         Domain:<br/>
         <select>
         {domainItems}
         </select>
         <br/>
         <br/>
         MDS server name:<br/>
         <input type="text" name="mdsserver"/>
         <br/>
         <br/>
         Build:<br/>
         <select>
         {definitionItems}
         </select>
         <br/>
         <select>
         {buildItems}
         </select>
         <br/>
         <br/>
         vSphere user name:<br/>
         <input type="text" name="user"/>
         <br/>
         <br/>
         vSphere password:<br/>
         <input type="text" name="passwd"/>
         <br/>
         <br/>
         Host address:<br/>
         <input type="text" name="host"/>
         <br/>
         <br/>                  

         </form>
  
      </div>

       return(componentContent)
        
    }


}       


export default UserFormCmp;
