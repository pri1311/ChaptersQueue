import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDoc, doc } from "firebase/firestore";
import ReactPlayer from "react-player";
import { handlePause, handlePlay, setChapterDone } from "../features/player";
import { db } from "../features/firebase-config";
import styles from "../styles/course.module.css";

function Player() {
  var ref = useRef(false);
  const [isMounted, setisMounted] = useState(false);
  const [duration, setduration] = useState(0);
  const dispatch = useDispatch();

  const {
    url,
    playing,
    controls,
    light,
    volume,
    muted,
    loop,
    played,
    loaded,
    playbackRate,
    pip,
    playAt,
    numChapters,
    index,
    chapters,
    videoID,
  } = useSelector((state) => state.player.value);
  const { title, channel } = useSelector((state) => state.player);
  const { uid } = useSelector((state) => state.user.value);

  function getVideoId(url) {
    let regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

    const id = url.match(regex)[1];
    return id;
  }

  const calEnd = (time) => {
    return parseInt(time - (time * 5) / 100);
  };

  const handleDuration = (duration) => {
    setduration(duration);
  };

  const handleProgress = async (state) => {
    console.log(chapters);
    var currChapter = chapters[index];
    console.log(index);
    if (currChapter !== null) {
      var endTime = currChapter["end"];
      var videoID = getVideoId(url);
      console.log(parseInt(state.playedSeconds));
      console.log(parseInt(endTime - 10));

      if (parseInt(state.playedSeconds) === parseInt(endTime - 10)) {
        console.log("chapter done");
        console.log(currChapter);
        await updateDoc(doc(db, "users", uid), {
          [`courses.${videoID}.chapters.${index}.played`]: true,
        });

        dispatch(setChapterDone(index));
      }
    }

    console.log(parseInt(state.playedSeconds));
  };

  var handleSeek = () => {
    ref.seekTo(playAt);
    dispatch(handlePlay());
  };

  useEffect(() => {
    if (isMounted) handleSeek();
  }, [playAt]);

  return (
    <div>
      <ReactPlayer
        ref={(node) => {
          if (node) {
            ref = node;
          }
        }}
        className="react-player"
        width="100%"
        height="60vh"
        url={url}
        pip={pip}
        playing={playing}
        controls={controls}
        light={light}
        loop={loop}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
        onReady={() => {
          console.log("onReady");
          setisMounted(true);
        }}
        onStart={() => console.log("onStart")}
        onPlay={handlePlay}
        onPause={handlePause}
        onBuffer={() => console.log("onBuffer")}
        onSeek={(e) => console.log("onSeek", e)}
        onError={(e) => console.log("onError", e)}
        onDuration={handleDuration}
        onProgress={handleProgress}
      />
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.channel}>{channel}</p>
    </div>
  );
}

export default Player;
