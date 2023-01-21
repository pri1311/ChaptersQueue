import React from 'react';
import Player from '../../components/Player';
import ChapterList from '../../components/ChapterList';

function Course() {
    return (
        <div className='coursepage-wrapper'>
            <ChapterList/>
            <Player/>
        </div>
    )
}

export default Course
