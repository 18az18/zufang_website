const crypto = require('crypto');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);

const cors = require('cors');
let MongoClient = require('mongodb').MongoClient;
const validator = require("validator");

var db;
MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydb", { useNewUrlParser: true }, function (err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

  // Save database object from the callback for reuse.
    db = client.db();
    // Initialize the app.
});

let multer  = require('multer');
let upload = multer({ dest: 'uploads/' });
let fs = require('file-system');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const session = require('express-session');
app.use(session({
    secret: 'very secret very secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: false, // key
        maxAge: null
    }
}));

const cookie = require('cookie');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

function generateSalt (){
    return crypto.randomBytes(16).toString('base64');
}

function generateHash (password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
}

var checkUsername = function(req, res, next) {
    if (!validator.isAlphanumeric(req.body.username)) return res.status(400).end("bad input");
    next();
};

let corsOptions = {
    origin: ["http://localhost:4200"],
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));

//app.use(express.static(path.join(__dirname, 'GameRoomUI/game-room/build')));


app.use(function(req, res, next){
    req.user = ('user' in req.session)? req.session.user : null;
    let username = (req.user)? req.user._id : '';
    res.setHeader('Set-Cookie', cookie.serialize('username', username, {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signup/
app.post('/signup/', checkUsername, (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    db.collection("users").findOne({_id: username}, function(err, user) {
        if (err) return res.status(500).end(err);
        if (user) return res.status(409).end("username " + username + " already exists");
        var salt = generateSalt();
        var hash = generateHash(password, salt);
        let newUser = new User(username, salt, hash, 0);
        db.collection("users").insertOne(newUser, function(err, result) {
            if (err) return res.status(500).end(err);
            db.collection("loggedUsers").insertOne(newUser, function(err, result) {
                if (err) return res.status(500).end(err);
                res.setHeader('Set-Cookie', cookie.serialize('username', newUser._id, {
                    path : '/', 
                    maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                    secure: true
                }));
                req.session.user = newUser;
                res.json(newUser);
            });
        });
    });
});

// curl -H "Content-Type: application/json" -X POST -d '{"username":"alice","password":"alice"}' -c cookie.txt localhost:3000/signin/
app.post('/signin/', checkUsername, (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    // retrieve user from the database
    //res.setHeader('Access-Control-Allow-Credentials', 'true')
    db.collection("users").findOne({ _id: username }, function(err, user) {
        if (err) return res.status(500).end(err);
        if (!user) return res.status(404).end("username " + username + " does not exists");
        if (user.hash !== generateHash(password, user.salt)) return res.status(401).end("access denied"); // invalid password
        db.collection("loggedUsers").findOne({ _id:username  }, function(err, loggedUser){
            if (loggedUser) return res.status(409).end("username " + username + " already signed in");
            db.collection("loggedUsers").insertOne(user, function(err, result) {
                if (err) return res.status(500).end(err);
                res.setHeader('Set-Cookie', cookie.serialize('username', user._id, {
                    path : '/', 
                    maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
                    secure: true
                }));
                req.session.user = user;
                res.json(user);
            });
        })
        
    });
});

// curl -b cookie.txt -c cookie.txt localhost:3000/signout/
app.get('/signout/', function (req, res, next) {
    let myquery = { _id: req.user._id };
    db.collection("loggedUsers").deleteOne(myquery, function(err, obj) {
        if (err) return res.status(500).end(err);
    });
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('username', '', {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7, // 1 week in number of seconds
          secure: true
    }));
    res.json("user successfully logged out")
});


http.listen(5000, function () {
    console.log("App now running on port 5000");
});