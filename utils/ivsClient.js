const { IvsClient } = require('@aws-sdk/client-ivs');
require('dotenv').config();

const ivsClient = new IvsClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.IVSCLIENT_AK,
    secretAccessKey: process.env.IVSCLIENT_SK,
  },
});

module.exports = ivsClient;
