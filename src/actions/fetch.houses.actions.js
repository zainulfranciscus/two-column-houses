export const APPLICATION_IS_FETCHING_LIST_OF_HOUSES =
  "application_is_fetching_list_of_houses";
export const FETCHING_LIST_OF_HOUSES_RESULTED_IN_ERROR =
  "error_happenned_when_fetching_list_of_houses";
export const FETCHING_HOUSE_DATA_IS_SUCCESSFUL =
  "fetching_list_of_houses_is_sucessful";
export const HOUSES = "houses";
export const ACTION_TYPE = "type";

export function isFetchingHouseData(bool) {
  return {
    type: APPLICATION_IS_FETCHING_LIST_OF_HOUSES,
    isFetchingListOfHouses: bool
  };
}

export function errorOccuredWhileFetchingHouseData(bool) {
  return {
    type: FETCHING_LIST_OF_HOUSES_RESULTED_IN_ERROR,
    hasErrorOccuredWhileFetchingListOfHouses: bool
  };
}

export function fetchListOfHouses(url) {
  return dispatch => {
    dispatch(isFetchingHouseData(true));
    dispatch(errorOccuredWhileFetchingHouseData(false));

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(isFetchingHouseData(false));

        return response;
      })
      .then(response => response.json())
      .then(houses => dispatch(fetchingHouseDataIsSuccessful(houses)))
      .catch(() => dispatch(errorOccuredWhileFetchingHouseData(true)));
  };
}

export function fetchingHouseDataIsSuccessful(data) {
  return fetchHouseActionBuilder()
    .withHouses(data)
    .build();
}

export function fetchHouseActionBuilder() {
  let houses;
  return {
    withHouses(h) {
      houses = h;
      return this;
    },
    build() {
      let action = {};
      action[ACTION_TYPE] = FETCHING_HOUSE_DATA_IS_SUCCESSFUL;
      action[HOUSES] = houses;
      return action;
    }
  };
}
