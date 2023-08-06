import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  addDoc,
  Timestamp,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  setChapters,
  setURL,
  handleSeekChange,
  setDetails,
} from "../features/player";
import { db } from "../features/firebase-config";

function LinkInput() {
  let navigate = useNavigate();
  var inputRef = useRef(null);
  const dispatch = useDispatch();
  var key = process.env.REACT_APP_YOUTUBE_API_KEY;
  var baseURL = "https://www.googleapis.com/youtube/v3/videos";
  const { uid, name } = useSelector((state) => state.user.value);
  const CourseData = useSelector((state) => state.player.value);
  const [chapters, setchapters] = useState(null);

  function getVideoId(url) {
    let regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

    const id = url.match(regex)[1];
    return id;
  }

  async function loadDescription() {
    var url = inputRef.current.value;
    let videoID = getVideoId(url);
    axios
      .get(baseURL, {
        params: {
          part: "snippet",
          key: key,
          id: videoID,
        },
      })
      .then((result) => {
        console.log(result);
        const data = parseDescription(result.data.items[0].snippet.description);

        dispatch(
          setDetails({
            title: result.data.items[0].snippet.title,
            channel: result.data.items[0].snippet.channelTitle,
          })
        );
        console.log(data);

        var cplist = {};
        for (var i in data) {
          var time = data[i][0].split(":");
          var seconds = 0;
          if (time.length === 2) {
            seconds = parseInt(time[0]) * 60 + parseInt(time[1]);
          } else {
            seconds =
              parseInt(time[0]) * 3600 +
              parseInt(time[1]) * 60 +
              parseInt(time[2]);
          }

          cplist[i] = {
            time: seconds,
            title: data[i][1],
            played: false,
          };
        }

        const numChapters = Object.keys(cplist).length;

        for (var j = 1; j < numChapters; j++) {
          cplist[j - 1]["end"] = cplist[j]["time"];
        }

        console.log(numChapters);
        setchapters(cplist);
        dispatch(setChapters(cplist));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function parseDescription(desc) {
    var list_of_chapters = [];
    var file = [];

    file = desc.split("\n");
    for (var l in file) {
      var line = file[l].trim();
      var result = "";
      var chapter = "";

      result = line.match(/\(?(\d+[:]\d+[:]\d+)\)?/);

      if (result === null) {
        result = line.match(/\(?(\d+[:]\d+)\)?/);
      }

      if (result === null) continue;
      chapter = line.split(result[1]);
      list_of_chapters.push([result[1], chapter[1]]);
    }

    return list_of_chapters;
  }

  const handleButtonClick = async (e) => {
    e.preventDefault();
    dispatch(setURL(inputRef.current.value));
    await loadDescription();
    console.log(inputRef.current.value);
  };

  useEffect(() => {
    if (chapters != null) {
      var url = inputRef.current.value;
      let videoID = getVideoId(url);

      async function sendData() {
        console.log("hello world");
        console.log(chapters);
        await updateDoc(doc(db, "users", uid), {
          [`courses.${videoID}`]: { videoID: videoID, chapters: chapters },
        });
        navigate("/player");
      }
      sendData();
    }
  }, [chapters]);

  return (
    <div>
      <form>
        <h1>Welcome {name} </h1>
        <input
          ref={inputRef}
          type="text"
          name="url"
          value="https://www.youtube.com/watch?v=bqFjrhRrvy8"
        ></input>
        <button onClick={handleButtonClick}>Proceed</button>
      </form>
    </div>
  );
}

export default LinkInput;
