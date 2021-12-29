import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { setURL } from '../features/player';
import { useDispatch } from 'react-redux';


function LinkInput() {
    let navigate = useNavigate();
    var inputRef = useRef(null);
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        dispatch(setURL(inputRef.current.value));
        console.log(inputRef.current.value);
        navigate('/player');
    }
    return (
        <div>
            <form>
                <input ref={inputRef} type="text" name="url"></input>
                <button onClick={handleButtonClick}>Proceed</button>
            </form>
        </div>
    )
}

export default LinkInput
