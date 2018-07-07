const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const data = require("./data.json");
const bodyParser = require("body-parser");
const {OAuth2Client} = require('google-auth-library');


const GOOGLE_CLIENT_ID = "53805206239-fliiinrnumott7bjt06tfkuscl2cn756.apps.googleusercontent.com";

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "./public/"));

app.use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next();
});

app.post("/login", function (req, res, next) {
    let token = req.body.token;
    const client = new OAuth2Client(GOOGLE_CLIENT_ID,'','');
      client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID // If you have multiple [CLIENT_ID_1, CLIENT_ID_2, ...]
      }, (err, login) => {
        console.log(login);
      });
});

app.get("/isLoggedIn", function (req, res, next) {
    let token = req.body.token;
    const client = new OAuth2Client(GOOGLE_CLIENT_ID,'','');
      client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID // If you have multiple [CLIENT_ID_1, CLIENT_ID_2, ...]
      }, (err, login) => {
        console.log(login);
      });
}); 
    
    app.get('/data', (req, res) => {
        let result = [];
        let length = data.length;
        
        for (let i = 0; i < 30; i++) {
            result.push(data[Math.floor(Math.random()*length)]);
        }
        res.json(result);
    });
    
    var rooms = [];
    
    io.on('connection', function(socket){
        socket.emit('news', { hello: 'world' });
        socket.on('start-game', (data) => {
            if (rooms.length > 0) {
                let room = rooms.shift();
                socket.rooms = [];
                socket.emit('receive', {content: {type:"ADD_USER", username: room.userId}});
                socket.join(room.socketId, function(err, result) {
                    socket.broadcast.to(socket.rooms[0]).emit('receive', {content: {type:"ADD_USER", username: data.userId}});
                    
                    let words = [];
                    let length = data.length;
                    
                    for (let i = 0; i < 30; i++) {
                        words.push(data[Math.floor(Math.random()*length)]);
                    }
                    
                    words.map((word) => {
                        var dispatcher = {type: "ADD_ON_SCREEN", word: word};
                        io.sockets.in(socket.rooms[0]).emit('receive', {content: dispatcher});
                    });
                });
            } else {
                //Only one guy in the room
                // io.sockets.in(socket.rooms[0]).emit('receive', {content: dispatcher});
                // socket.emit('receive', {content: {type:"WAITING_FOR_USER"}})
                rooms.push({socketId:socket.rooms[0], userId: data.userId});
            }
        });
    });
    
    app.get('/', function (req, res) {
        res.sendFile(__dirname + "/public/index.html");
    });
    
    server.listen(2222, () => console.log('Typewar app listening on port 2222!'))