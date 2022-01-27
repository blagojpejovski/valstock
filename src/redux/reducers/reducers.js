import { combineReducers } from "redux";
import notificationReducer from "../notification/notificationSlice";
import loginReducer from "../login/loginSlice";
import albumReducer from "../album/albumSlice";

const reducers = combineReducers({
    notification: notificationReducer,
    login: loginReducer,
    album: albumReducer,
});

export default reducers;
