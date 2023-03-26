import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {Reducer as UserReducer} from "./Users/reducer";
import {Reducer as SprintReducer} from "./Sprints/reducer";
import {Reducer as TaskReducer} from "./Tasks/reducer";
import {Reducer as AttributesReducer} from "./Attributes/reducer";

const rootReducer=combineReducers({UserReducer,SprintReducer,TaskReducer,AttributesReducer});

const store=legacy_createStore(rootReducer,applyMiddleware(thunk));

export {store};