import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';



function ChapterList() {
    var key = process.env.REACT_APP_YOUTUBE_API_KEY;
    var baseURL = 'https://www.googleapis.com/youtube/v3/videos';
    var { url } = useSelector((state) => state.player.value);

    function getVideoId(url) {
        let regex = /https\:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})/;

        const id = url.match(regex)[1]; 
        return id;
    }

    function loadDescription() {
        let videoID = getVideoId(url);
        axios.get(baseURL, {
        params: {
            part: "snippet",
            key: key,
            id: videoID,
        },
        })
        .then((result) => {
            console.log(parseDescription(result.data.items[0].snippet.description));
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
            console.log(line);
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

    useEffect(() => {
        loadDescription()
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default ChapterList
