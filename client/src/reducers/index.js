import { combineReducers } from "redux";

import cart from "./cart-reducer";
import user from "./auth-reducer";

export default combineReducers({ cart, user });
