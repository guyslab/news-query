// Get dependencies
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

// Get our API routes
const api = require('./routes/api');
const defaults = require('./routes/default');

const app = express();
app.use(cors({origin: '*'}));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Set our api routes
app.use('/', api);

// 500
app.use(defaults.errorHandler);
  
// 404
app.use(defaults.notFound);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));  