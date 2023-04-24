const { GetStreamCommand } = require('@aws-sdk/client-ivs');
const utils = require('../utils');

// Used in web socket
exports.getViewers = async ({ channelArn }) => {
  // Uses a retry policy as the streams arn isn't always live yet when first fired due to aws delay
  const MAX_RETRIES = 5;
  const RETRY_DELAY_MS = 5000;
  let retries = 0;
  // Sent from chat component
  const getStreamCommandInput = {
    channelArn,
  };
  let keepGoing = true;

  while (retries < MAX_RETRIES && keepGoing) {
    try {
      //   Gets information about the active (live) stream on a specified channel
      const getStreamRequest = new GetStreamCommand(getStreamCommandInput);
      const getStreamResponse = await utils.ivsClient.send(getStreamRequest);
      keepGoing = false;
      return getStreamResponse.stream.viewerCount;
    } catch (err) {
      if (err.Code === 'ChannelNotBroadcasting') {
        // Retry after a delay
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
        retries++;
      } else {
        // Other error, rethrow
        console.error(err);
      }
    }
  }
};
