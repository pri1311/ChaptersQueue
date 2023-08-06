import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            uid: "",
            name: "",
            email: "",
            courses: [],
        },
    },
    reducers: {
        setUid: (state, action) => {
            state.value.uid = action.payload;
        },
        setEmail: (state, action) => {
            state.value.email = action.payload;
        },
        setUsername: (state, action) => {
            state.value.name = action.payload;
        },
        setCourses: (state, action) => {
            state.value.courses = [...state.value.courses, action.payload];
        },
        setUserDetails: (state, action) => {
            state.value = { ...state.value, ...action.payload };
        },
    },
});

export const { setUid, setEmail, setUsername, setCourses, setUserDetails } =
    userSlice.actions;

export default userSlice.reducer;
