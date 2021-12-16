'use strict'

const express = require('express')
const app = express()
const contactUsFormRouter = require('./routes/contactusrouter')

app.use(express.static('dist'))
app.use(express.json())
app.use('/forms/contactusform', contactUsFormRouter)


app.use((err, req, res, next) => {
  if(err.status === 400) res.status(404).send(err.message);
  else res.status(500).send('An error occured');
  });

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
