import {
  FETCHING_LIST_OF_HOUSES_RESULTED_IN_ERROR,
  APPLICATION_IS_FETCHING_LIST_OF_HOUSES
} from "../actions/fetch.houses.actions";

export function fetchingListOfHousesHasErrored(state = false, action) {
  switch (action.type) {
    case FETCHING_LIST_OF_HOUSES_RESULTED_IN_ERROR:
      return action.hasErrorOccuredWhileFetchingListOfHouses;

    default:
      return state;
  }
}

export function isFetchingListOfHouses(state = false, action) {
  switch (action.type) {
    case APPLICATION_IS_FETCHING_LIST_OF_HOUSES:
      return action.isFetchingListOfHouses;
    default:
      return state;
  }
}
