import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./Gallery.css";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://picsum.photos/v2/list");
            const data = await res.json();
            setImages(data);
        };
        fetchData();
    }, []);

    const handleRedirect = (id) => {
        navigate(`../details/${id}`);
    };
    return (
        <div className="gallery-container">
            {images.map((item) => (
                <img
                    src={item.download_url}
                    className="gallery-image"
                    key={item.id}
                    alt="Error loading"
                    onClick={() => handleRedirect(item.id)}
                />
            ))}
            <Outlet />
        </div>
    );
};

export default Gallery;
