import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import './Video.css';
import 'video.js/dist/video-js.css';
import { registerIVSTech } from 'amazon-ivs-player';

export const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  // Registers the ivs tech
  registerIVSTech(videojs, {
    wasmWorker: 'http://localhost:3000/ivs/amazon-ivs-wasmworker.min.js',
    wasmBinary: 'http://localhost:3000/ivs/amazon-ivs-wasmworker.min.wasm',
  });
  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          techOrder: ['AmazonIVS', 'html5'],
        },
        () => {
          videojs.log('player is ready');

          onReady && onReady(player);
        },
      ));
      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.src(options.sources[0].src);
      player.autoplay(options.autoplay);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="videoContainer" data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
