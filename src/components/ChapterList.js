import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleSeekChange } from '../features/player';



function ChapterList() {
    const { chapters } = useSelector((state)=>state.player.value)
    const [chaptersList, setchaptersList] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        var list = [];
        
        for (var i in chapters) {
            list.push(<button key={i} value={i} onClick={(e) => {
                console.log(e.target.value);
                dispatch(handleSeekChange({playAt: chapters[parseInt(e.target.value)]['time'], index: parseInt(e.target.value)}));                    
            }} >{chapters[i]['title']}</button>);
        }

        setchaptersList(list);
        
    }, [])

    return (
        <div>
            {chaptersList}
        </div>
    )
}

export default ChapterList
