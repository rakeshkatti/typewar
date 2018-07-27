const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const data = require("./data.json");
const bodyParser = require("body-parser");
const {OAuth2Client} = require('google-auth-library');
const devServer = require("./middlewares/devServer");
const authentication = require("./middlewares/authentication");

const PORT = process.env.NODE_PORT || 2222;
const ENV = process.env.NODE_ENV || "production";
const GOOGLE_CLIENT_ID = "53805206239-fliiinrnumott7bjt06tfkuscl2cn756.apps.googleusercontent.com";

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "./public/"));

if (ENV === "stage") {
    const CLIENT_PORT = process.env.CLIENT_PORT || "3000";
    app.use(devServer.allowCORS.bind(CLIENT_PORT));
}

//Is authenticated?
app.use(authentication);

app.post("/login", function (req, res, next) {
    let token = req.body.token;
    const client = new OAuth2Client(GOOGLE_CLIENT_ID,'','');
    client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID
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

server.listen(PORT, () => {
    console.log(`Typewar app listening on port ${PORT} with ${ENV} environment!`)
});