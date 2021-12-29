import React, { useEffect } from 'react';
import axios from "axios";


function ChapterList() {
    var key = process.env.REACT_YOUTUBE_API_KEY;
    var videoID = 'k68j9xlbHHk'
    var url = 'https://www.googleapis.com/youtube/v3/videos'

    function loadDescription() {
        axios.get(url, {
        params: {
            part: "snippet",
            key: key,
            id: videoID,
        },
        })
        .then((result) => {
            console.log(result.data.items[0].snippet.description);
        })
    }

    useEffect(() => {
        loadDescription()
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default ChapterList
