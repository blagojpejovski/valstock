import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "login",
    initialState: {
        loggedIn: false,
    },
    reducers: {
        setLogin: (state, action) => {
            state.loggedIn = action.payload.loggedIn;
        },
    },
});

export const { setLogin } = slice.actions;

export default slice.reducer;
