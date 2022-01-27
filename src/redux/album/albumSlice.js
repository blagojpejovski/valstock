import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "album",
    initialState: {
        dialogVisible: false,
        albums: [],
        selectedImage: {},
    },
    reducers: {
        openDialog: (state, action) => {
            state.dialogVisible = action.payload.dialogVisible;
        },
        createAlbum: (state, action) => {
            state.albums = [
                ...state.albums,
                {
                    id: state.albums.length,
                    name: action.payload.name,
                    images: [state.selectedImage],
                },
            ];
        },
        addPictureToAlbum: (state, action) => {
            const currentAlbum = state.albums.find(
                (album) => album.id === action.payload.albumId
            );
            currentAlbum.images = [...currentAlbum.images, state.selectedImage];
        },
        selectImage: (state, action) => {
            state.selectedImage = {
                ...action.payload.image,
            };
        },
    },
});

export const { openDialog, createAlbum, addPictureToAlbum, selectImage } =
    slice.actions;

export default slice.reducer;
