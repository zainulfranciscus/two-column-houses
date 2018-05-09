import {
  fetchingListOfHousesHasErrored,
  isFetchingListOfHouses
} from "./reducer";
import {
  FETCHING_LIST_OF_HOUSES_RESULTED_IN_ERROR,
  APPLICATION_IS_FETCHING_LIST_OF_HOUSES
} from "../actions/fetch.houses.actions";

describe("unit tests for reducers ", () => {
  it("Given that state is false, fetchingListOfHousesHasErrored should false", () => {
    const payload = {
      type: FETCHING_LIST_OF_HOUSES_RESULTED_IN_ERROR,
      hasErrorOccuredWhileFetchingListOfHouses: false
    };

    const state = fetchingListOfHousesHasErrored(false, payload);
    expect(state).toBe(payload.hasErrorOccuredWhileFetchingListOfHouses);
  });

  it("Given that state is true, then isFetchingListOfHouses should be true", () => {
    const payload = {
      type: APPLICATION_IS_FETCHING_LIST_OF_HOUSES,
      isFetchingListOfHouses: true
    };

    const state = isFetchingListOfHouses(true, payload);
    expect(state).toBe(payload.isFetchingListOfHouses);
  });
});
