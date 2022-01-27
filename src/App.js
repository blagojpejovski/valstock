import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Gallery from "./pages/Gallery/Gallery";
import Notification from "./components/Notification/Notification";
import Dialog from "./components/Dialog/Dialog";
import { useSelector } from "react-redux";
import Details from "./pages/Details/Details";

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <div className="page-container">
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route
                        exact
                        path="/gallery"
                        element={
                            <RequireAuth redirectTo="/">
                                <Gallery />
                            </RequireAuth>
                        }
                    />
                    <Route
                        exact
                        path="/details"
                        element={
                            <RequireAuth redirectTo="/">
                                <Details />
                            </RequireAuth>
                        }
                    >
                        <Route path=":details" element={<Details />} />
                    </Route>
                </Routes>
            </div>
            <Dialog />
            <Notification />
        </div>
    );
}

export default App;

const RequireAuth = ({ children, redirectTo }) => {
    const login = useSelector((state) => state.login);

    return login.loggedIn ? children : <Navigate to={redirectTo} />;
};
