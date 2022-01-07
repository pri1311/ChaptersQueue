import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { setChapters, setURL, handleSeekChange } from '../features/player';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";



function LinkInput() {
    let navigate = useNavigate();
    var inputRef = useRef(null);
    const dispatch = useDispatch();
    var key = process.env.REACT_APP_YOUTUBE_API_KEY;
    var baseURL = 'https://www.googleapis.com/youtube/v3/videos';
    const { uid, username } = useSelector((state)=>state.user.value);
    
    function getVideoId(url) {
        let regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

        const id = url.match(regex)[1]; 
        return id;
    }

    function loadDescription() {
        var url = inputRef.current.value;
        let videoID = getVideoId(url);
        axios.get(baseURL, {
        params: {
            part: "snippet",
            key: key,
            id: videoID,
        },
        })
        .then((result) => {
            const data = parseDescription(result.data.items[0].snippet.description);
            console.log(data);
            var list = [];
            for (var i in data) {
                var time = (data[i][0]).split(":");
                var seconds = 0;
                if (time.length === 2) {
                    seconds = parseInt(time[0]) * 60 + parseInt(time[1]);
                }
                else {
                    seconds = parseInt(time[0])* 360 + parseInt(time[1])*60 + parseInt(time[2]);
                }
                
                list.push(<button key={i} value={seconds} onClick={(e) => {
                    console.log(e.target.value);
                    dispatch(handleSeekChange(parseFloat(e.target.value)));                    
                }} >{data[i][1]}</button>);
            }
            dispatch(setChapters(list));
            
        })
        .catch((err)=> {console.log(err);})
    }

    function parseDescription(desc) {
        var list_of_chapters = []
        var file = []

        file = desc.split('\n');
        for (var l in file) {
            var line = (file[l]).trim()
            var result = "";
            var chapter = "";
    
            result = line.match(/\(?(\d+[:]\d+[:]\d+)\)?/)

            if (result === null) {
                result = line.match(/\(?(\d+[:]\d+)\)?/);
            }   

            if (result === null) continue;
            chapter = line.split(result[1])
            list_of_chapters.push([result[1], chapter[1]])
        }

        return list_of_chapters;
    }


    const handleButtonClick = async () => {
        dispatch(setURL(inputRef.current.value));
        await loadDescription();
        console.log(inputRef.current.value);
        navigate('/player');
    }
    return (
        <div>
            <form>
                <h1>Welcome {username} </h1>
                <input ref={inputRef} type="text" name="url"></input>
                <button onClick={handleButtonClick}>Proceed</button>
            </form>
        </div>
    )
}

export default LinkInput
