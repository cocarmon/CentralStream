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
    muted: false,
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
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="row m-0 w-100 h-100">
        <Videojs options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
      <div className="broadcastContainer__two">
        {channelArn ? <Chat channelArn={channelArn} /> : null}
      </div>
    </div>
  );
};

export default VideoPlayer;
