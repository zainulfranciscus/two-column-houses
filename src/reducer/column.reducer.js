import {
  FETCHING_HOUSE_DATA_IS_SUCCESSFUL,
  HOUSES
} from "../actions/fetch.houses.actions";
import {
  HOUSE_TO_BE_ADDED_TO_RIGHT_COLUMN,
  MOVE_HOUSE_TO_LEFT_COLUMN,
  MOVE_HOUSE_TO_RIGHT_COLUMN
} from "../actions/move.houses.actions";
import listOfHousesDecorator from "../data/list.of.houses.decorator";

export default function columnReducer(initialState = {}, action) {
  switch (action.type) {
    case FETCHING_HOUSE_DATA_IS_SUCCESSFUL:
      return Object.assign({}, action[HOUSES]);
    case MOVE_HOUSE_TO_RIGHT_COLUMN:

      const houseToBeAddedToTheRightColumn = action[HOUSE_TO_BE_ADDED_TO_RIGHT_COLUMN];
      const houseAlreadyExist = listOfHousesDecorator(initialState).existInTheRightColumn(houseToBeAddedToTheRightColumn);

      if(houseAlreadyExist){
        return initialState;
      }

      let houses = Object.assign({}, initialState);
      listOfHousesDecorator(houses)
        .rightColumnHouses()
        .push(action[HOUSE_TO_BE_ADDED_TO_RIGHT_COLUMN]);
      return houses;

    case MOVE_HOUSE_TO_LEFT_COLUMN:
      const houses2 = Object.assign({}, initialState);
      listOfHousesDecorator(houses2).removeHouseFromTheRightColumn(
        action[HOUSE_TO_BE_ADDED_TO_RIGHT_COLUMN]
      );
      return houses2;
    default:
      return initialState;
  }
}
