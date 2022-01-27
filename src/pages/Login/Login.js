import "./Login.css";
import LoginFooter from "./LoginFooter/LoginFooter";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../../redux/notification/notificationSlice";
import { useNavigate } from "react-router-dom";
import Gallery from "../Gallery/Gallery";
import Navbar from "../../components/Navbar/Navbar";
import { setLogin } from "../../redux/login/loginSlice";

// In a real app, we would make a request to backend to login, but here we are using predefined values to mimic a login functionality
const USERNAME = "blagojpejovski";
const PASSWORD = "valstock123";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "" });
    const [isError, setIsError] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUser((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }));
        setIsError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.username === USERNAME && user.password === PASSWORD) {
            dispatch(setNotification({ open: true }));
            setTimeout(() => {
                dispatch(setNotification({ open: false }));
            }, 2000);
            navigate("/gallery");
            dispatch(setLogin({ loggedIn: true }));
            // redirect to home page
        } else {
            setIsError(true);
        }
    };
    return (
        <div className="login-container">
            <div className="login-header">
                <div className="login-header-text">
                    Join our stock community!
                </div>
                <div className="login-header-subtext">
                    Download free photos and videos powered by the best
                    photographers.
                </div>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <div className="login-input-label">USERNAME</div>
                    <input
                        className={`login-input ${isError ? "login-input-error" : ""
                            }`}
                        placeholder="Enter username here . . ."
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        value={user.username}
                    />
                    <div className="login-input-error-message">
                        {isError && "There is something wrong!"}
                    </div>
                </div>
                <div className="input-container">
                    <div className="login-input-label">PASSWORD</div>
                    <input
                        className={`login-input ${isError ? "login-input-error" : ""
                            }`}
                        placeholder="Enter password here . . ."
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={user.password}
                    />
                    <div className="login-input-error-message">
                        {isError && "There is something wrong!"}
                    </div>
                </div>

                <button className="button-dark" type="submit">
                    LOG IN
                </button>
            </form>

            <LoginFooter />
        </div>
    );
};

export default Login;
