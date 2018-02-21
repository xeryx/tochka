
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class UserFormCmp extends Component {


   render() {  

      let domainItems = [];
      let definitionItems = [];
      let buildItems = [];

      
      for (let i = 0; i < this.props.domainList.length; i++ ) {
         domainItems.push(<MenuItem value={i} primaryText={this.props.domainList[i]} key={i} />);
      }

      for (let i = 0; i < this.props.definitionList.length; i++ ) {
         definitionItems.push(<MenuItem value={i} primaryText={this.props.definitionList[i]} key={i} />);
      }

      for (let i = 0; i < this.props.buildList.length; i++ ) {
         buildItems.push(<MenuItem value={i} primaryText={this.props.buildList[i]} key={i} />);
      }


      let componentContent = <div>
         <TextField 
            hintText="askaqa01"
            floatingLabelText="Server Name"
            floatingLabelFixed={true}
            style={{fontSize:"1em"}}
            floatingLabelStyle={{fontSize:"1em"}}
         >
         </TextField>
         <br/>
         <br/>
         <DropDownMenu 
            value={this.props.domainIndex} 
            onChange={this.handleChange}
            autoWidth={true}
         >
            {domainItems}
        </DropDownMenu>
         <br/>
         <br/>
         <TextField 
            hintText="askarsna01"
            floatingLabelText="MDS servers name:"
            floatingLabelFixed={true}
            style={{fontSize:"1em"}}
            floatingLabelStyle={{fontSize:"1em"}}
         />
         <br/>
         <br/>
         <DropDownMenu 
            value={this.props.definitionIndex} 
            onChange={this.handleChange}
            autoWidth={true}
         >
            {definitionItems}
         </DropDownMenu>
         <br/>
         <br/>
         <DropDownMenu 
            value={this.props.buildIndex} 
            onChange={this.handleChange}
            autoWidth={true}
         >
            {buildItems}
        </DropDownMenu>                 
        <br/>
        <br/>
         <TextField 
            hintText="fmsuz\user"
            floatingLabelText="vSphere user name:"
            floatingLabelFixed={true}
            style={{fontSize:"1em"}}
            floatingLabelStyle={{fontSize:"1em"}}
         />
         <br/>
         <br/>
         <TextField 
            floatingLabelText="vSphere password:"
            floatingLabelFixed={true}
            type="password"
            style={{fontSize:"1em"}}
            floatingLabelStyle={{fontSize:"1em"}}
         />
         <br/>
         <br/>
         <TextField 
            hintText="vecnter-mv2.fmsuz.com"
            floatingLabelText="Host address:"
            floatingLabelFixed={true}
            style={{fontSize:"1em"}}
            floatingLabelStyle={{fontSize:"1em"}}
         />         
      </div>

       return(componentContent)
        
    }


}       


export default UserFormCmp;
