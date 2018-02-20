import React, { Component } from 'react';
import axios from 'axios';

class FileUpload extends Component {
   constructor() {
      super();
      this.state = {
         selectedFile: '',
      };
   }

   onChange = (e) => {
      const state = this.state;

      switch (e.target.name) {
         case 'fileToUpload':
         state.selectedFile = e.target.files[0];
         break;
         default:
         state[e.target.name] = e.target.value;
      }

      this.setState(state);
   }

   onSubmit = (e) => {
      e.preventDefault();
      const { selectedFile } = this.state;
      let formData = new FormData();

      formData.append('fileToUpload', selectedFile);

      axios.post('/upload/', formData)
         .then((result) => {
         // access results...
         });
   }

   render() {
      return (
         <form onSubmit={this.onSubmit}>
         <input
            type="file"
            name="fileToUpload"
            onChange={this.onChange}
         />
         <button type="submit">Submit</button>
         </form>
      );
   }
}

export default FileUpload;