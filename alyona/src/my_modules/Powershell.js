import React, { Component } from 'react';

class Powershell extends Component {
    
    render() {  

      return (<div>
         <div>
            <input 
                  type="text" 
                  value={this.props.commandText} 
                  onChange={this.props.handleChange} 
                  onKeyPress={this.props.handleKeyPress}
                  style={{width:1000, backgroundColor:"black", color:"white"}}
            />            
            <button 
               style={{margin:"0px 0px 0px 25px"}} 
               onClick={this.props.handleClick}>
               Send
            </button>
         </div>
         <br></br>
         <div>
            <textarea 
               value={this.props.outputText}
               style={{width:1000, height:600, backgroundColor:"black", color:"white"}}
            /> 
         </div>

         
      </div>);
    }

}        


export default Powershell;
