const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const http = require('http');

const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, 'build')));

// add proxy redirect to backend api
app.use(
  '/api',
  createProxyMiddleware({
    target: process.env.API_URL,
    changeOrigin: true,
  }),
);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '80';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
