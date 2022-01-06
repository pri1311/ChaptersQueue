import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
    name: "player",
    initialState: {
        value: {
            url: null,
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
            playAt: 0,
            chapters: null,
        }
    },
    reducers: {
        'handlePlayPause': (state, _) => {
            state.value.playing = !state.playing;
        },
        'handleStop': (state, _) => {
            state.value.playing = false;
        },
        'handlePause': (state, _) => {
            state.value.playing = false;
        },
        'handlePlay': (state, _) => {
            state.value.playing = true;
        },
        'handleSeekChange': (state, action) => {
            state.value.playAt = parseFloat(action.payload);
        },
        'setURL': (state, action) => {
            state.value.url = action.payload;
        },
        'setChapters': (state, action) => {
            console.log(action.payload);
            state.value.chapters = action.payload;
            console.log(state.value);
        }
    }
});

export const { handlePlayPause, handleStop, handlePause, handlePlay, handleSeekChange, setURL, setChapters} = playerSlice.actions;

export default playerSlice.reducer;