import React, { Component } from 'react';
import './app.css';
import ContactUs from './parts/contactus.js';

class App extends Component { 
    render() {
      return (
        <div className="App">
            <ContactUs></ContactUs>
            
        </div>
    );
  }
}

export default App;
