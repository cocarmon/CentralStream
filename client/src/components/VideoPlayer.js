import { useRef, useState, useEffect } from 'react';
import Videojs from './Videojs';
import { Chat } from './Chat';
const VideoPlayer = (props) => {
  const playerRef = useRef(null);
  const [playbackUrl, setPlaybackUrl] = useState(null);
  const [channelArn, setChannelArn] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const arn = queryParams.get('channel');
    const url = queryParams.get('playbackUrl');
    if (url && arn) {
      setPlaybackUrl(url);
      setChannelArn(arn);
    }
  }, []);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: playbackUrl,
        type: 'application/x-mpegURL',
      },
    ],
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;
    // You can handle player events here, for example:
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
    player.on('loadedmetadata', () => {
      player.dimensions(player.currentWidth, player.currentHeight);
    });
  };
  return (
    <>
      <div className="broadcastContainer">
        <div className="broadcastContainer_one">
          <Videojs
            className="vjs-layout-large"
            options={videoJsOptions}
            onReady={handlePlayerReady}
          />
        </div>
        <div className="broadcastContainer__two">
          {channelArn ? <Chat channelArn={channelArn} /> : null}
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
