import "./Navbar.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
    const login = useSelector((state) => state.login);
    const albums = useSelector((state) => state.album.albums);

    const [albumDropdownActive, setAlbumDropdownActive] = useState(false);

    return (
        <div className="navbar-container">
            <div className="centered-third"></div>
            <div className="navbar-logo-container">
                <img className="logo" src="/logo.svg" alt="Logo" />
            </div>
            <div className="centered-third">
                {login.loggedIn && (
                    <div className="my-album-container">
                        <button
                            className="button-my-album"
                            onClick={() => {
                                setAlbumDropdownActive((prev) => !prev);
                            }}
                        >
                            <span className="button-my-album-label">
                                MY ALBUMS
                            </span>
                        </button>
                        <div
                            className={`album-dropdown-container ${
                                !albumDropdownActive &&
                                "album-dropdown-container-hidden"
                            }`}
                        >
                            {albums.map((album) => (
                                <div
                                    key={album.id}
                                    className="album-dropdown-item"
                                >
                                    <span>{album.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
