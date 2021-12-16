'use strict'
const express = require('express');
const createError = require('http-errors')
const router = express.Router()

router.post('/', async (req, res, next) => {

    //Request body validator function
    const validateBody = (sentInfo) => {
      let isValid = sentInfo !== null && typeof sentInfo === 'object';
      isValid = isValid && Object.keys(sentInfo).length === 10;
      isValid = isValid && sentInfo.hasOwnProperty('firstName');
      isValid = isValid && sentInfo.hasOwnProperty('lastName');
      isValid = isValid && sentInfo.hasOwnProperty('npiNumber');
      isValid = isValid && sentInfo.hasOwnProperty('streetAddress');
      isValid = isValid && sentInfo.hasOwnProperty('aptOrSuiteOrOther');
      isValid = isValid && sentInfo.hasOwnProperty('city');
      isValid = isValid && sentInfo.hasOwnProperty('currentState');
      isValid = isValid && sentInfo.hasOwnProperty('zipCode');
      isValid = isValid && sentInfo.hasOwnProperty('telephoneNumber');
      isValid = isValid && sentInfo.hasOwnProperty('emailAddress');
      isValid = isValid && typeof sentInfo.firstName === 'string';
      isValid = isValid && typeof sentInfo.lastName === 'string';
      isValid = isValid && typeof sentInfo.npiNumber === 'string';
      isValid = isValid && typeof sentInfo.streetAddress === 'string';
      isValid = isValid && typeof sentInfo.aptOrSuiteOrOther === 'string';
      isValid = isValid && typeof sentInfo.city === 'string';
      isValid = isValid && typeof sentInfo.currentState === 'string';
      isValid = isValid && typeof sentInfo.zipCode === 'string';
      isValid = isValid && typeof sentInfo.telephoneNumber === 'string';
      isValid = isValid && typeof sentInfo.emailAddress === 'string';
      return isValid;
    }

    //Input validator function
    const validateInput = () => {
      const firstName = req.body.firstName.toString();
      const lastName = req.body.lastName.toString();
      const npiNumber = req.body.npiNumber.toString();
      const streetAddress = req.body.streetAddress.toString();
      const aptOrSuiteOrOther = req.body.aptOrSuiteOrOther.toString();
      const city = req.body.city.toString();
      const currentState = req.body.currentState.toString();
      const zipCode = req.body.zipCode.toString();
      const telephoneNumber = req.body.telephoneNumber.toString();
      const emailAddress = req.body.emailAddress.toString().toLowerCase();
      //Regex checkers
      const emailChecker = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      const phoneChecker = /[0-9]{10}/;

      let errorArray = [];

      //Handle all inputs
      if(!firstName || firstName.length > 35 || firstName.length < 3) errorArray.push('First name required');
      if(!lastName || lastName.length > 35 || lastName.length < 3) errorArray.push('Last name required');
      if(!npiNumber || npiNumber.length > 20 || npiNumber.length < 3) errorArray.push('NPI number required');
      if(!streetAddress || streetAddress.length > 50 || streetAddress.length < 3) errorArray.push('Street address required');
      if(!city || city.length > 50 || city.length < 3) errorArray.push('City required');
      if(!currentState || currentState.length !== 2) errorArray.push('State required (i.e., FL)');
      if(!zipCode || zipCode.length !== 5) errorArray.push('Zip code required');
      if(!telephoneNumber || !phoneChecker.test(telephoneNumber)) errorArray.push('Correct phone number required');
      if(!emailAddress || emailAddress.length > 50 || !emailChecker.test(emailAddress)) errorArray.push('Correct email required');

      //Send out notifications
      if(errorArray.length > 0) {
          next(createError(400, errorArray[0]))
          return
      } else {
        res.send('Information sent successfully!')
        return
      }
    }

    //Validate request body, then validate user input
    if(!validateBody(req.body)) {
      next(createError(403))
      return
    } else {
      validateInput();
    }
});

module.exports = router;