import { useState } from 'react';
import IVSBroadcastClient from 'amazon-ivs-web-broadcast';
import copyIcon from '../../assets/icons/copy.png';
import api from '../api';
import { Chat } from './Chat';
import './Broadcast.css';

const Broadcast = () => {
  const [client, setClient] = useState(null);
  const [liveStreamEnded, setLiveStreamEnded] = useState(false);

  const initBroadcast = async ({
    arn,
    ingestEndpoint,
    streamKey,
    viewLink,
  }) => {
    // Loads the canvas for the livestream
    setLiveStreamEnded(false);

    // BASIC_LANDSCAPE Stream configuration 1280x720/30fps
    const streamConfig = IVSBroadcastClient.BASIC_FULL_HD_LANDSCAPE;
    const devices = await navigator.mediaDevices.enumerateDevices();
    window.videoDevices = devices.filter((d) => d.kind === 'videoinput');
    window.audioDevices = devices.filter((d) => d.kind === 'audioinput');
    window.cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: window.videoDevices[0].deviceId,
        width: {
          ideal: streamConfig.maxResolution.width,
          max: streamConfig.maxResolution.width,
        },
        height: {
          ideal: streamConfig.maxResolution.height,
          max: streamConfig.maxResolution.height,
        },
      },
    });

    window.microphoneStream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: window.audioDevices[0].deviceId },
    });

    const newClient = IVSBroadcastClient.create({
      // Enter the desired stream configuration
      streamConfig,
      // Enter the ingest endpoint from the AWS console or CreateChannel API
      ingestEndpoint,
    });

    console.log(window.microphoneStream);
    newClient.addVideoInputDevice(window.cameraStream, 'camera1', { index: 0 }); // only 'index' is required for the position parameter
    newClient.addAudioInputDevice(window.microphoneStream, 'mic1');

    // Used to send the arn back in releaseChannel
    newClient.arn = arn;
    newClient.viewLink = viewLink;
    const previewEl = document.getElementById('preview');
    newClient.attachPreview(previewEl);
    newClient.startBroadcast(streamKey);
    setClient(newClient);
  };
  const getChannelInformation = async () => {
    if (!client) {
      const token = localStorage.getItem('token');
      const response = await api.get('/streams/getStreamInformation/', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      initBroadcast(response.data);
    }
  };
  const releaseChannel = async () => {
    if (client) {
      client.stopBroadcast();
      await api.post('/streams/releaseChannel', {
        arn: client.arn,
      });
      setClient(null);
      setLiveStreamEnded(true);
    }
  };
  const handleShareable = () => {
    navigator.clipboard.writeText(client.viewLink);
  };
  const handleRecord = async () => {
    const recordResponse = await api.get('/streams/tag-object/');
  };
  return (
    <div className="broadcastContainer">
      <div className="broadcastContainer_one">
        <div className="broadcastContainer_one--stream">
          {!liveStreamEnded ? <canvas id="preview" /> : null}
        </div>
        {client?.viewLink ? (
          <>
            <div className="broadcastContainer_one--buttons">
              <div className="broadcast_link">
                <label id="shareable_label" for="shareable">
                  <img
                    id="shareableIcon"
                    src={copyIcon}
                    alt="Copy Icon"
                    onClick={handleShareable}
                  />
                </label>
                <input
                  id="shareable"
                  name="publicLink"
                  type="text"
                  readOnly
                  value={client.viewLink}
                />
              </div>
              <button id="broadcast_end" onClick={releaseChannel}>
                End
              </button>
              <button id="" onClick={handleRecord}>
                Record
              </button>
            </div>
          </>
        ) : (
          <button id="broadcast_start" onClick={getChannelInformation}>
            Start
          </button>
        )}
      </div>
      <div className="broadcastContainer__two">
        {client ? <Chat channelArn={client.arn} /> : null}
      </div>
    </div>
  );
};

export default Broadcast;
