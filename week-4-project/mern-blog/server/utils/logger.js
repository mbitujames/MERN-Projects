const morgan = require('morgan');
const { createWriteStream } = require('fs');

// Log to console
const consoleLogger = morgan('dev');

// Log to file
const fileLogger = morgan('combined', {
  stream: createWriteStream('./logs/server.log', { flags: 'a' })
});

module.exports = { consoleLogger, fileLogger };