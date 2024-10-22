"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var node_http_1 = require("node:http");
var server = (0, node_http_1.createServer)(function (req, res) {
    // Routing
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, world!');
    }
    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About page');
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});
server.listen(process.env.PORT, function () {
    console.log("Server listening on port ".concat(process.env.PORT));
});
