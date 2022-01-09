import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import { handlePause, handlePlay} from '../features/player';


function Player() {
    var ref = useRef(false);
    const [isMounted, setisMounted] = useState(false);
    const [duration, setduration] = useState(0)
    const dispatch = useDispatch();

    const { url, playing, controls, light, volume, muted, loop, played, loaded, playbackRate, pip, playAt, numChapters, index, chapters } = useSelector((state) => state.player.value)

    const calEnd = (time) => {
        return parseInt(time - ((time * 5) / 100));
    }
    
    const handleDuration = (duration) => {
        setduration(duration);
    }

    const handleProgress = (state) => {
        var currChapter = chapters[index];
        var endTime = currChapter['end'];
        
        if (parseInt(state.playedSeconds) === parseInt(endTime - 10)) {
            console.log("chapter done");
            console.log(currChapter);
        }
    }
    
    var handleSeek = () =>{
        ref.seekTo(playAt);
        dispatch(handlePlay());
    }

    useEffect(() => {
        if (isMounted) handleSeek();
        
    }, [playAt])

    
    return (
        <div>
            <p>{duration}</p>
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
                onDuration={handleDuration}
                onProgress={handleProgress}
            />
        </div>
    )
}

export default Player
