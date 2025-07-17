function performanceMonitor(req, res, next) {
  const start = process.hrtime();

  res.on('finish', function() {
    const diff = process.hrtime(start);
    const duration = diff[0] * 1e3 + diff[1] / 1e6; // in ms
    console.log('[Performance] ' + req.method + ' ' + req.originalUrl + ' - ' + duration.toFixed(2) + ' ms');
  });

  next();
}

module.exports = performanceMonitor;
