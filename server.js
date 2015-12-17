'use strict';

const express     = require('express');
const app         = express();
const server      = require('http').createServer(app);
const request     = require('request');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const cors        = require('cors');
const path        = require('path');

const userRoutes  = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/events', eventRoutes);

let mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/museum-events';

mongoose.connect(mongoUri, (err) => {
  if(err) {
    console.log('MongoLab connection error.', err);
  } else {
    console.log('MongoLab connection successful');
  }
});

server.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = app.get('port');

  console.log('Express is running:', host, port);
});
