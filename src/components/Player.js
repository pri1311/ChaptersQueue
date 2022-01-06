import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import { handlePause, handlePlay} from '../features/player';



function Player() {
    var ref = useRef(false);
    const [isMounted, setisMounted] = useState(false);
    const dispatch = useDispatch();

    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip, playAt } = useSelector((state) => state.player.value)

    var handleSeek = () =>{
        ref.seekTo(playAt);
        dispatch(handlePlay());
    }

    useEffect(() => {
        if (isMounted) handleSeek();
        
    }, [playAt])

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
                onReady={() => 
                    {console.log('onReady');
                    setisMounted(true);
                }
                }
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
