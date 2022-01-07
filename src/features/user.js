import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            uid: null,
            username: null,
            email: null,
        }
    },
    reducers: { 
        'setUid': (state, action) => {
            state.value.uid = action.payload;
        },
        'setEmail': (state, action) => {
            state.value.email = action.payload;
        },
        'setUsername': (state, action) => {
            state.value.username = action.payload;
        },
        'setUserDetails': (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setUid, setEmail, setUsername, setUserDetails } = userSlice.actions;

export default userSlice.reducer;