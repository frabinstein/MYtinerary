import { combineReducers } from "redux";
import cityReducer from "./cityReducer";

const rootReducer = combineReducers({cities: cityReducer});

export default rootReducer;
