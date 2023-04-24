const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const {
  GetChannelCommand,
  GetStreamKeyCommand,
  ListStreamKeysCommand,
  TagResourceCommand,
  CreateChannelCommand,
} = require('@aws-sdk/client-ivs');

const {
  CreateChatTokenCommand,
  CreateRoomCommand,
} = require('@aws-sdk/client-ivschat');

require('dotenv').config();
const utils = require('../utils');
const db = require('../models');
const config = require('../config/authConfig');

const userModel = db.user;
const channelModel = db.channel;

// Get channel information: playback url,ingest point,arn
// Used in initializing broadcast
const getChannelInformation = async (channelArn) => {
  try {
    const getChannelCommand = new GetChannelCommand({
      arn: channelArn,
    });
    const response = await utils.ivsClient.send(getChannelCommand);

    const { channel } = response;
    return channel;
  } catch (err) {
    throw new utils.AppError(
      500,
      `Could Not Get Channel Information: ${err.message}`,
    );
  }
};

// StreamKey - used to identify a source of video streaming
// Needed for client.startBroadcast(streamKey)
const getStreamKey = async (streamArn, name) => {
  try {
    const getStreamKeyCommand = new GetStreamKeyCommand({
      arn: streamArn,
      name,
    });
    const { streamKey } = await utils.ivsClient.send(getStreamKeyCommand);

    return streamKey.value;
  } catch (err) {
    throw new utils.AppError(
      500,
      `Could Not Get Channel StreamKey: ${err.message}`,
    );
  }
};

// Used to get the streamkey Arn
const listKeys = async ({ arn }) => {
  try {
    const listStreamKeysCommand = new ListStreamKeysCommand({
      channelArn: arn,
      maxResults: Number('int'),
    });
    const response = await utils.ivsClient.send(listStreamKeysCommand);
    return response.streamKeys[0]?.arn;
  } catch (err) {
    throw new utils.AppError(500, `Could Not Get Stream Arn ${err.message}`);
  }
};

// Creates link to share with viewers
// Will have to come back and add signing this
const generateViewLink = ({ playbackUrl, arn, ...rest }) => {
  const publicLink = `http://${
    process.env.APP_URL
  }/view/?channel=${encodeURIComponent(arn)}&playbackUrl=${encodeURIComponent(
    playbackUrl,
  )}`;
  return publicLink;
};

const verifyJwt = (jwtToken) => {
  const verified = jwt.verify(jwtToken, config.secret);
  if (!verified) {
    return new utils.AppError(401, 'Invalid or Expired token');
  }
  return verified;
};

// Allows users to chat
// eslint-disable-next-line consistent-return
exports.createChatToken = utils.catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Default values if user isn't logged in
  let resolved = { id: `${uuidv4()}` };
  let username = '';

  const { channelArn } = req.body;
  const tokenWithoutBearer = authHeader.replace('Bearer ', '');
  const {
    dataValues: { chatarn: chatArn, chatendpoint: chatEndpoint },
  } = await channelModel.findOne({
    where: { channelarn: channelArn },
  });
  if (tokenWithoutBearer) {
    resolved = verifyJwt(tokenWithoutBearer);
    const userObject = await userModel.findOne({ where: { id: resolved.id } });
    if (!userObject) {
      return next(new utils.AppError(404, 'User Not Found'));
    }
    username = userObject.dataValues.username;
  }
  // Requires chatToken to get message events
  // There's no View_Message capability as viewers who aren't signed in shouldn't be able to chat
  // So they have to have send_message capability, but through authorization on frontend prevents non-signed in veiwers from being able to chat
  const params = {
    attributes: {
      displayName: username,
    },
    capabilities: ['SEND_MESSAGE'],
    roomIdentifier: chatArn,
    userId: `${resolved.id}`,
  };
  // Creates an encrypted token that is used by a chat participant
  const command = new CreateChatTokenCommand(params);
  const data = await utils.ivsChat.send(command);
  res.status(200).json({
    chatToken: data.token,
    chatEndpoint,
  });
});

// Used to store s3 key to the correct user
const setUserIdTag = utils.catchAsync(async (jwtToken, channelArn) => {
  const resolved = verifyJwt(jwtToken);
  const params = {
    resourceArn: `${channelArn}`,
    tags: {
      user_id: `${resolved.id}`,
    },
  };
  const command = new TagResourceCommand(params);
  const response = await utils.ivsClient.send(command);
});

// Creates new channel when all other channels are busy
const createNewChannel = async () => {
  const channelParams = {
    name: `channel-${uuidv4()}`,
    recordingConfigurationArn: process.env.CHANNEL_RECORDING_INFORMATION, // Same recording config for all streams
  };
  const chatParams = {
    name: `room-${uuidv4()}`,
  };
  const channelCommand = new CreateChannelCommand(channelParams);
  const chatCommand = new CreateRoomCommand(chatParams);

  const [channelResponse, chatResponse] = await Promise.all([
    await utils.ivsClient.send(channelCommand),
    await utils.ivsChat.send(chatCommand),
  ]);

  const { arn: channelarn } = channelResponse.channel;
  const { arn: chatarn } = chatResponse;
  const chatendpoint = process.env.CHAT_ENDPOINT;

  await channelModel.create({
    channelarn,
    chatarn,
    chatendpoint,
    inuse: true,
  });
  return { channelarn };
};

// Sends channel information to the broadcast component, used in initBroadcast
exports.streamInformation = utils.catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;
  const tokenWithoutBearer = authHeader.replace('Bearer ', '');
  let dataValues = await channelModel.findOne({
    where: { inuse: false },
  });

  if (!dataValues) {
    // Create a new channel
    dataValues = await createNewChannel();
  }
  const { channelarn } = dataValues;

  await channelModel.update(
    {
      inuse: true,
    },
    {
      where: { channelarn },
    },
  );

  const channelInformation = await getChannelInformation(channelarn);
  // const setUserTag = await setUserIdTag(tokenWithoutBearer, channelArn);
  const listStreamKeys = await listKeys(channelInformation);
  const streamKey = await getStreamKey(listStreamKeys, channelInformation.name);
  channelInformation.streamKey = streamKey;
  channelInformation.viewLink = generateViewLink(channelInformation);
  res.status(200).json(channelInformation);
});

exports.releaseChannel = utils.catchAsync(async (req, res) => {
  const { arn } = req.body;

  await channelModel.update(
    {
      inuse: false,
    },
    {
      where: { channelarn: arn },
    },
  );

  res.status(200).json({
    status: 'Success',
  });
});

// Once hosted setup a lambda function ot isnert the user_id and the channel information into post gres
const eventBridgeListener = utils.catchAsync(async () => {
  const filterLogEventsInput = {
    logGroupName: '/aws/events/ivs-stream-recording-end-log-group',
    startTime: 1670875080000,
    endTime: 1670875200000,
  };
});
// Add Later
// exports.createLike = async(req,res) => {};
// exports.createTag = async (req, res) => {};
// exports.updateStreams = async (req, res) => {};
