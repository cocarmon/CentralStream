import { useState } from 'react';
import IVSBroadcastClient from 'amazon-ivs-web-broadcast';
import { BottomToggle } from './BottomToggle';
import api from '../api';
import { Chat } from './Chat';

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
  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="row">
        <div className="">
          {!liveStreamEnded ? (
            <canvas id="preview" className="col-12 mt-2" />
          ) : null}
        </div>
        {client?.viewLink ? (
          <>
            <BottomToggle
              client={client}
              setClient={setClient}
              setLiveStreamEnded={setLiveStreamEnded}
            />
          </>
        ) : (
          <button
            className="btn mb-5 align-self-end"
            onClick={getChannelInformation}
          >
            <strong className="text-white">Start</strong>
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
