const { IvschatClient } = require('@aws-sdk/client-ivschat');
require('dotenv').config();

const ivsClient = new IvschatClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.IVSCLIENT_AK,
    secretAccessKey: process.env.IVSCLIENT_SK,
  },
});

module.exports = ivsClient;
