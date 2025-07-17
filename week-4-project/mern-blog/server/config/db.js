const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.consoleLogger(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.consoleLogger(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;