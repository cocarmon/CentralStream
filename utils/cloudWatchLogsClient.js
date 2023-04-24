const { CloudWatchLogsClient } = require('@aws-sdk/client-cloudwatch-logs');
require('dotenv').config();

const cloudWatchClient = new CloudWatchLogsClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.IVSCLIENT_AK,
    secretAccessKey: process.env.IVSCLIENT_SK,
  },
});

module.exports = cloudWatchClient;
