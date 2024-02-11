const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const configRoutes = require("./routes");
require("dotenv").config();

const static = express.static(__dirname + "/public");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
    session({
        name: "AuthCookie",
        secret: "some secret string!",
        resave: false,
        saveUninitialized: true,
    })
);

//globals here
//This file contains all global variables
//Example: constants, variable names, etc.
global.userTypeParent = "PARENT";
global.userTypeNanny = "NANNY";
global.userTypeChild = "CHILD";

const ctrReq = {};
let users = [];

configRoutes(app);
const PORT = process.env.PORT || 3000;
const http = require("http").Server(app);
http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

const socketIO = require("socket.io")(http, {
    cors: {
        origin: ["*", "https://nurture-nest.vercel.app", "https://nurture-nest-backend.vercel.app"],
        credentials: true,
    },
});

socketIO.on("connection", (socket) => {
    socket.on("message", (data) => {
        socketIO.emit("messageResponse", data);
    });

    //Listens when a new user joins the server
    socket.on("newUser", (data) => {
        //Adds the new user to the list of users
        users.push(data);
        //Sends the list of users to the client
        socketIO.emit("newUserResponse", users);
    });

    socket.on("disconnect", () => {
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        //Sends the list of users to the client
        socketIO.emit("newUserResponse", users);
        socket.disconnect();
    });
});
