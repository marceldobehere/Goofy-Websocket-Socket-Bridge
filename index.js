const LOCAL_SSH_SERVER_HOST = 'marceldobehere.com';
const LOCAL_SSH_SERVER_PORT = 2222;


const WebSocket = require('ws');
const net = require('net');
const fs = require("fs");
//const express = require('express');
//const app = express();
const http = require("http");
const https = require("https");


let USE_HTTPS = false;
if (process.argv[2] && process.argv[2] === '-https')
    USE_HTTPS = true;
else
    USE_HTTPS = false;

// if /data folder doesnt exist, create it
if (!fs.existsSync(__dirname + "/data"))
{
    fs.mkdirSync(__dirname + "/data");
}

if (USE_HTTPS && !fs.existsSync(__dirname + "/data/ssl"))
{
    console.log("SSL FOLDER DOESNT EXIST");
    console.log("> Either host the server using http (set USE_HTTPS to false) or create the ssl keys.");
    console.log();
    console.log("To create the ssl keys, open a terminal in the data folder and run the following commands:");
    console.log("mkdir ssl");
    console.log("cd ssl");
    console.log("openssl genrsa -out key.pem");
    console.log("openssl req -new -key key.pem -out csr.pem");
    console.log("openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem");
    return;
}

let server;
if (!USE_HTTPS)
    server = http.createServer();
else
    server = https.createServer(
        {
            key: fs.readFileSync(__dirname + "/data/ssl/key.pem"),
            cert: fs.readFileSync(__dirname + "/data/ssl/cert.pem"),
        });

const wss = new WebSocket.Server({ server });
wss.on('connection', ws => {
    console.log(`> Client connected`);
    let socket = new net.Socket();
    socket.connect(LOCAL_SSH_SERVER_PORT, LOCAL_SSH_SERVER_HOST, () => {
        console.log(`> Connected to SSH server at ${LOCAL_SSH_SERVER_HOST}:${LOCAL_SSH_SERVER_PORT}`);
    });

    socket.on('close', () => {
        console.log(`> Disconnected from SSH server at ${LOCAL_SSH_SERVER_HOST}:${LOCAL_SSH_SERVER_PORT}`);
        try { ws.close();}
        catch (e) {}
    });
    ws.on('close', () => {
        console.log(`> Client disconnected`);
        try {socket.destroy();}
        catch (e) {}
    });

    socket.on('data', data => {
        ws.send(data);
        console.log(`> Received data from SSH server`);
    });
    ws.on('message', message => {
        socket.write(message);
        console.log(`> Received data from client`);
    });
});

let port = USE_HTTPS ? 443 : 80;
server.listen(port, () => {
    console.log('> Started server on *:'+port);
});



/*
const WebSocket = require('ws');
const net = require('net');

const LOCAL_SSH_SERVER_HOST = 'marceldobehere.com';
const LOCAL_SSH_SERVER_PORT = 2222;

const wss = new WebSocket.Server({ port: 443 });
console.log('> Started server on *:443');

wss.on('connection', ws => {
    console.log(`> Client connected`);
    let socket = new net.Socket();
    socket.connect(LOCAL_SSH_SERVER_PORT, LOCAL_SSH_SERVER_HOST, () => {
        console.log(`> Connected to SSH server at ${LOCAL_SSH_SERVER_HOST}:${LOCAL_SSH_SERVER_PORT}`);
    });

    socket.on('close', () => {
        console.log(`> Disconnected from SSH server at ${LOCAL_SSH_SERVER_HOST}:${LOCAL_SSH_SERVER_PORT}`);
        try { ws.close();}
        catch (e) {}
    });
    ws.on('close', () => {
        console.log(`> Client disconnected`);
        try {socket.destroy();}
        catch (e) {}
    });

    socket.on('data', data => {
        ws.send(data);
        console.log(`> Received data from SSH server`);
    });
    ws.on('message', message => {
        socket.write(message);
        console.log(`> Received data from client`);
    });
});
*/