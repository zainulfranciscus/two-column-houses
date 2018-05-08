import {
  FETCHING_HOUSE_DATA_IS_SUCCESSFUL,
  HOUSES
} from "../actions/fetch.houses.actions";
import {
  HOUSE_TO_BE_MOVED,
  MOVE_HOUSE_TO_LEFT_COLUMN,
  MOVE_HOUSE_TO_RIGHT_COLUMN
} from "../actions/move.houses.actions";
import listOfHousesDecorator from "../data/list.of.houses.decorator";

export default function columnReducer(initialState = {}, action) {
  switch (action.type) {
    case FETCHING_HOUSE_DATA_IS_SUCCESSFUL:
      return Object.assign({}, action[HOUSES]);
    case MOVE_HOUSE_TO_RIGHT_COLUMN:
      let houses = Object.assign({}, initialState);
      houses = listOfHousesDecorator(houses).removeHouseFromTheRightColumn(
        action[HOUSE_TO_BE_MOVED]
      );
      listOfHousesDecorator(houses)
        .rightColumnHouses()
        .push(action[HOUSE_TO_BE_MOVED]);
      return houses;
    case MOVE_HOUSE_TO_LEFT_COLUMN:
      const houses2 = Object.assign({}, initialState);
      listOfHousesDecorator(houses2).removeHouseFromTheRightColumn(
        action[HOUSE_TO_BE_MOVED]
      );
      return houses2;
    default:
      return initialState;
  }
}
