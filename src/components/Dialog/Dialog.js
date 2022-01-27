import "./Dialog.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    openDialog,
    createAlbum,
    addPictureToAlbum,
} from "../../redux/album/albumSlice";
import { setNotification } from "../../redux/notification/notificationSlice";

const Dialog = () => {
    const visible = useSelector((state) => state.album.dialogVisible);
    const albums = useSelector((state) => state.album.albums);
    const dispatch = useDispatch();

    const [albumTitle, setAlbumTitle] = useState("");
    const [creatingNew, setCreatingNew] = useState(true);
    const [selectedAlbumId, setSelectedAlbumId] = useState(
        albums.length ? albums[0].id : 0
    );

    const handleSave = () => {
        if (creatingNew) {
            dispatch(
                createAlbum({
                    name: albumTitle,
                })
            );
        } else {
            dispatch(
                addPictureToAlbum({
                    albumId: selectedAlbumId,
                })
            );
        }
        dispatch(
            openDialog({
                dialogVisible: false,
            })
        );
        dispatch(
            setNotification({
                open: true,
            })
        );
        setTimeout(() => {
            dispatch(
                setNotification({
                    open: false,
                })
            );
        }, 2000);
        setAlbumTitle("");
        setSelectedAlbumId(albums.length ? albums[0].id : 0);
        setCreatingNew(true);
    };

    return (
        <div>
            {visible && <div className="dialog-background"></div>}
            <div
                className={`dialog-container ${
                    !visible && "dialog-container-hidden"
                }`}
            >
                <div className="dialog-items">
                    <div className="tabs-button">
                        <button
                            className={
                                creatingNew
                                    ? "tabs-button-label-selected"
                                    : "tabs-button-label"
                            }
                            onClick={() => {
                                setCreatingNew(true);
                            }}
                        >
                            CREATE NEW ALBUM
                        </button>
                        <button
                            className={
                                !creatingNew
                                    ? "tabs-button-label-selected"
                                    : "tabs-button-label"
                            }
                            onClick={() => {
                                setCreatingNew(false);
                            }}
                        >
                            ADD TO EXISTING
                        </button>
                    </div>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={(e) => setAlbumTitle(e.target.value)}
                        value={albumTitle}
                        placeholder="Enter title here"
                        className={`dialog-input ${!creatingNew && "hidden"}`}
                    />
                    <div
                        className={`album-list-container ${
                            creatingNew && "hidden"
                        }`}
                    >
                        {albums.map((album) => (
                            <div
                                key={album.id}
                                style={{ fontSize: "20px" }}
                                className={`album-dropdown-item ${
                                    creatingNew && "hidden"
                                } ${
                                    selectedAlbumId === album.id && "selected"
                                }`}
                                onClick={() => {
                                    setSelectedAlbumId(album.id);
                                }}
                            >
                                <span>{album.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="dialog-buttons">
                        <button
                            className="button-white"
                            onClick={() => {
                                dispatch(
                                    openDialog({
                                        dialogVisible: false,
                                    })
                                );
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="button-dark"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
