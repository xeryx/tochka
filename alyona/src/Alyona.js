import './styles/Alyona.css';
import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import Powershell from "./my_modules/Powershell"
import FileUpload from "./my_modules/FileUpload"

class Alyona extends Component {

   constructor(props) {
      super(props); 

         this.state = {
            commandText: "", 
            outputText: "", 
         };
     
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.send = this.send.bind(this);
      this.dataReceived = this.dataReceived.bind(this);
   }

   render() {

      return (
            <div> 
               <Powershell
                  commandText={this.state.commandText}
                  outputText={this.state.outputText}
                  handleChange={this.handleChange}
                  handleClick={this.handleClick}
                  handleKeyPress={this.handleKeyPress}
               />
               <FileUpload/>
            </div>


      )
   }

   send(command, isSync) {
      let path = "/powershell/";
      if (isSync) path = path + "sync/"
      fetch(path, {
         headers: {
             'Content-Type': 'application/json'
           },
         method: "post",
         body: JSON.stringify({cmd:command})
     })
     .then(response => response.json())
     .then(responseJson => {
         if(responseJson.success === "true") {
            this.setState({outputText:responseJson.output})
         } else {
            this.setState({outputText:JSON.stringify(responseJson.error)})
         }
      })
     
   }
   
   handleChange(event) {
      let value =  event.target.value;
      this.setState({commandText:value});
   }
   handleClick(event) {
      this.setState({outputText:""})
      this.send(this.state.commandText, false)
   }
   handleKeyPress(event) {
      if (event.key === 'Enter') {
         this.setState({outputText:""})
         this.send(this.state.commandText, true)
       }
   }

   registerSocket = function(socketName) {
      const socket = openSocket({transports: ['websocket','polling']});
      socket.on(socketName, this.dataReceived);
   }

   dataReceived = function(newdata) { 
      this.setState({outputText : this.state.outputText + "\nNew: " + JSON.parse(newdata).message});
    } 
    
}

export default Alyona;
