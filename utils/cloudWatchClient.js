const { CloudWatchClient } = require('@aws-sdk/client-cloudwatch');
require('dotenv').config();

const client = new CloudWatchClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.IVSCLIENT_AK,
    secretAccessKey: process.env.IVSCLIENT_SK,
  },
});

module.exports = client;
