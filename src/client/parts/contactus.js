import React, { Component } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import './contactus.css';

class ContactUs extends Component {
  state = { 
    uncheckedRecaptcha: true,
    submitSuccess: '',
    submitSuccessColor: 'green',
    firstName: '',
    lastName: '',
    npiNumber: '',
    streetAddress: '',
    aptOrSuiteOrOther: '',
    city: '',
    currentState: '',
    zipCode: '',
    telephoneNumber: '',
    emailAddress: ''
   };
  
   onInputChange = (e, input) => {
     let stateObject = {};
     stateObject[input] = e.target.value;
    this.setState(stateObject);
  }

  onChange = () => {
    this.setState({uncheckedRecaptcha: false});
  }

  onSubmit = () => {
    document.getElementById('successDiv').focus()
    this.setState({submitSuccess: 'Loading...'});
    axios.post('/forms/contactusform', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      npiNumber: this.state.npiNumber,
      streetAddress: this.state.streetAddress,
      aptOrSuiteOrOther: this.state.aptOrSuiteOrOther,
      city: this.state.city,
      currentState: this.state.currentState,
      zipCode: this.state.zipCode,
      telephoneNumber: this.state.telephoneNumber,
      emailAddress: this.state.emailAddress
    }).then(data => {
      this.setState({
        submitSuccess: data.data,
        submitSuccessColor: 'green',
        firstName: '',
        lastName: '',
        npiNumber: '',
        streetAddress: '',
        aptOrSuiteOrOther: '',
        city: '',
        currentState: '',
        zipCode: '',
        telephoneNumber: '',
        emailAddress: ''
      });
    })
      .catch(err => {
        this.setState({ submitSuccess: err.response.data, submitSuccessColor: 'red'})
      })
  }

  render () {
    return (
      <div className='contactUsBackgroundContainer'>
        <div className='contactUsContainer' id='contactus'>
          <div className='contactUsTopParagraphDiv'>
            <div>Well on your way to join our family!</div>
            <br/>
            <div className='smallerCaption'>Sign up and we will be in touch with you shortly.</div>
          </div>
          <div className='formContainerDiv'>
              <div className='formStyle'>
                  <div>
                    <div><input type='text' value={this.state.firstName} onChange={(e) => this.onInputChange(e, 'firstName')} placeholder='First Name' className='textInput' maxLength='35'/></div>
                    <div><input type='text' value={this.state.lastName} onChange={(e) => this.onInputChange(e, 'lastName')} name='lastname' placeholder='Last Name' className='textInput' maxLength='35' /></div>
                    <div><input type='text' value={this.state.npiNumber} onChange={(e) => this.onInputChange(e, 'npiNumber')} name='npinumber' placeholder='NPI Number' className='textInput' maxLength='20' /></div>
                    <div><input type='text' value={this.state.streetAddress} onChange={(e) => this.onInputChange(e, 'streetAddress')} name='streetaddress' placeholder='Business Street Address' className='textInput' maxLength='50'/></div>
                    <div><input type='text' value={this.state.aptOrSuiteOrOther} onChange={(e) => this.onInputChange(e, 'aptOrSuiteOrOther')} name='aptorsuiteorother' placeholder='Apt / Suite/ Other' className='textInput' maxLength='10' /></div>
                    <div><input type='text' value={this.state.city} onChange={(e) => this.onInputChange(e, 'city')} name='city' placeholder='City' className='textInput' maxLength='50' /></div>
                    <div><input type='text' value={this.state.currentState} onChange={(e) => this.onInputChange(e, 'currentState')} name='state' placeholder='State (i.e., FL)' className='textInput' maxLength='2'/></div>
                    <div><input type='text' value={this.state.zipCode} onChange={(e) => this.onInputChange(e, 'zipCode')} name='zipcode' placeholder='Zip Code' className='textInput' maxLength='5'/></div>
                    <div><input type='tel' value={this.state.telephoneNumber} onChange={(e) => this.onInputChange(e, 'telephoneNumber')} placeholder='Telephone Number' id="phoneValidator" pattern='[0-9]{10}' className='textInput' maxLength='10'/></div>
                    <div><input type='email' value={this.state.emailAddress} onChange={(e) => this.onInputChange(e, 'emailAddress')} placeholder='Email Address' id='emailvalidator' className='textInput' maxLength='50'/></div>
                  </div>
                  <div>
                    <ReCAPTCHA className='g-recaptcha' sitekey="6Lc-6qYdAAAAALzOHq05tFafCoGta8_R-L5iulmy" onChange={this.onChange}/>
                  </div>
                  <button onClick={() => this.onSubmit()} disabled={this.state.uncheckedRecaptcha} className='submitBotton'>Submit</button>
                  <br/><br/>
                  <div id='successDiv' style={{color: this.state.submitSuccessColor, fontWeight: 'bold'}}>{this.state.submitSuccess}</div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactUs