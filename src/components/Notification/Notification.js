import "./Notification.css";
import { useSelector } from "react-redux";

const Notification = () => {
    const notification = useSelector((state) => state.notification);

    return (
        <div
            className={`notification-container ${
                !notification.open && "notification-hidden"
            }`}
        >
            <div
                className={`notification-message ${
                    !notification.open && "notification-message-hidden"
                }`}
            >
                This is a success message!
            </div>
        </div>
    );
};

export default Notification;
