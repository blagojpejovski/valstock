import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "notification",
    initialState: {
        open: false,
    },
    reducers: {
        setNotification: (state, action) => {
            state.open = action.payload.open;
        },
    },
});

export const { setNotification } = slice.actions;

export default slice.reducer;
