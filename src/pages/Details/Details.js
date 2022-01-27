import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { openDialog, selectImage } from "../../redux/album/albumSlice";
import "./Details.css";

const Details = () => {
    const params = useParams();
    const clickedId = params.details;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [clickedImage, setClickedImage] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `https://picsum.photos/id/${clickedId}/info`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            const data = await res.json();
            setClickedImage(data);
        };
        fetchData();
    }, [clickedId]);

    return (
        <div className="details-container">
            <div className="details-button-container">
                <button
                    className="button-white"
                    style={{ width: "160px" }}
                    onClick={() => {
                        dispatch(
                            openDialog({
                                dialogVisible: true,
                            })
                        );
                        dispatch(
                            selectImage({
                                image: clickedImage,
                            })
                        );
                    }}
                >
                    Add to album +
                </button>
                <a href={clickedImage.download_url} download>
                    <button className="button-dark">Download</button>
                </a>
            </div>
            <img
                className="details-image"
                src={clickedImage.download_url}
                alt={"Error loading"}
            />
            <div className="details-image-info">
                <div className="login-input-label">Uploaded By</div>
                <div className="details-author">{clickedImage.author}</div>
                <div className="details-date">12th January 2022</div>
            </div>
            <button
                className="button-white"
                onClick={() => {
                    navigate("../../gallery");
                }}
            >
                Go Back
            </button>
        </div>
    );
};
export default Details;
