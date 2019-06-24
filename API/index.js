'use strict';

const express = require('express');
const path = require('path');
require('./db/mongoose');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

// Add express sesssion middleware
app.use(session({
    secret: 'LTJSB',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1800000,
        httpOnly: true
    }
}));


//routes
require('./routes/user')(app);
require('./routes/apartment')(app);
require('./routes/announcement')(app);

app.listen(port);

console.log('App is listening on port ' + port);

// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, '/build')));


// // special case for admin, check for
// app.get('/adminDashboard', authenticateAdmin, (req,res) =>{
//     res.sendFile(path.join(__dirname+'/build/index.html')
//     );
// })


// // Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/build/index.html'));
// });

