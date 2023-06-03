const { S3 } = require('@aws-sdk/client-s3');
require('dotenv').config();

const client = new S3({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.IVSCLIENT_AK,
    secretAccessKey: process.env.IVSCLIENT_SK,
  },
});

module.exports = client;
