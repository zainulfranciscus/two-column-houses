import { combineReducers } from "redux";
import {
  fetchingListOfHousesHasErrored,
  isFetchingListOfHouses
} from "./reducer";
import columnReducer from "./column.reducer";

export default combineReducers({
  fetchingListOfHousesHasErrored,
  isFetchingListOfHouses,
  houses: columnReducer
});
