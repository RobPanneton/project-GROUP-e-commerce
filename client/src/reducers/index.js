import { combineReducers } from "redux";

import { userReducer as user, getCartItems } from "./user-reducer";
import auth from "./auth-reducer";

export default combineReducers({ user, getCartItems, auth });
