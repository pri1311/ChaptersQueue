import React from 'react';
import { useSelector } from 'react-redux';



function ChapterList() {
    const { chapters } = useSelector((state)=>state.player.value)

    return (
        <div>
            {chapters}
        </div>
    )
}

export default ChapterList
