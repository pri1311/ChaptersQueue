import React from 'react';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { handlePlayPause, handleStop, handlePause, handlePlay, handleSeekChange} from '../features/player';



function Player() {
    var ref = useRef(null);

    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip, playAt } = useSelector((state) => state.player.value)

    var handleSeek = () =>{
        ref.seekTo(playAt);
    }

    return (
        <div>
            <ReactPlayer
                ref={node => { 
                    if (node) {
                        ref = node;
                    }
                }}
                className='react-player'
                width='50%'
                height='60vh'
                url={url}
                pip={pip}
                playing={playing}
                controls={controls}
                light={light}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
                onReady={() => console.log('onReady')}
                onStart={() => console.log('onStart')}
                onPlay={handlePlay}
                onPause={handlePause}
                onBuffer={() => console.log('onBuffer')}
                onSeek={e => console.log('onSeek', e)}
                onError={e => console.log('onError', e)}
            />
            <button onClick={handleSeek}>click me</button>
        </div>
    )
}

export default Player
