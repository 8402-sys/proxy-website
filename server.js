import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { createBareServer } from '@tomphttp/bare-server-node';
import { shield } from './middleware.js';

const app = express();
const server = createServer(app);
const bare = createBareServer('/bare/');

app.use(shield); // Security Layer
app.use('/uv/', express.static(uvPath));
app.use(express.static('public'));

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) bare.routeRequest(req, res);
    else app(req, res);
});
server.on('upgrade', (req, sock, head) => {
    if (bare.shouldRoute(req)) bare.routeUpgrade(req, sock, head);
    else sock.end();
});

server.listen(process.env.PORT || 10000);
