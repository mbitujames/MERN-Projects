// server/tests/unit/logger.test.js
const logger = require('../../src/middleware/logger');

test('logger middleware logs request and calls next', () => {
  const req = {
    method: 'GET',
    originalUrl: '/test',
  };
  const res = {
    statusCode: 200,
    on: jest.fn((event, callback) => {
      if (event === 'finish') {
        callback();
      }
    }),
  };
  const next = jest.fn();

  logger(req, res, next);

  expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
  expect(next).toHaveBeenCalled();
});
