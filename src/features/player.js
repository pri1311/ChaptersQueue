import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        value: {
            url: "https://www.youtube.com/watch?v=LlvBzyy-558",
            pip: false,
            playing: false,
            controls: true,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
            playAt: 153,
        }
    },
    reducers: {
        'handlePlayPause': (state, _) => {
            state.playing = !state.playing;
        },
        'handleStop': (state, _) => {
            state.playing = false;
        },
        'handlePause': (state, _) => {
            state.playing = false;
        },
        'handlePlay': (state, _) => {
            state.playing = true;
        },
        'handleSeekChange': (state, action) => {
            state.played = parseFloat(action.payload);
        },
    }
});

export const { handlePlayPause, handleStop, handlePause, handlePlay, handleSeekChange} = playerSlice.actions;

export default playerSlice.reducer;