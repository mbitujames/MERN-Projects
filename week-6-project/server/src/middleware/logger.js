const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../../logs/server.log');

function logger(req, res, next) {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const duration = diff[0] * 1e3 + diff[1] / 1e6; // in ms
    const logMessage = `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration.toFixed(2)} ms\n`;

    // Write log to file
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Failed to write log:', err);
      }
    });

    // Also log to console
    console.log(logMessage.trim());
  });

  next();
}

module.exports = logger;
