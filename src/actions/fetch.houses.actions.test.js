import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { aHouse } from "../data/house.decorator.test";
import {
  isFetchingHouseData,
  errorOccuredWhileFetchingHouseData,
  fetchingHouseDataIsSuccessful,
  fetchListOfHouses
} from "./fetch.houses.actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockHousesData = {
  results: [aHouse]
};

describe("action creators unit tests", () => {
  const url = "url";
  let store;

  beforeEach(() => {
    fetchMock.reset();
    store = mockStore({ leftColumnHouses: [], rightColumnHouses: [] });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("Given data for houses can be read successfully from an external resource, then actions produced should match the expected actions", () => {
    fetchMock.getOnce(url, { body: mockHousesData });
    const expectedActions = [
      isFetchingHouseData(true),
      errorOccuredWhileFetchingHouseData(false),
      isFetchingHouseData(false),
      fetchingHouseDataIsSuccessful(mockHousesData)
    ];

    return store.dispatch(fetchListOfHouses(url)).then(() => {
      const actions = store.getActions;
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("Given fetching list of houses resulted in an error, then actions produced should match the expected actions ", () => {
    const BAD_RESPONSE_ERROR_CODE = 400;
    fetchMock.getOnce(url, BAD_RESPONSE_ERROR_CODE);
    const expectedActions = [
      isFetchingHouseData(true),
      errorOccuredWhileFetchingHouseData(false),
      errorOccuredWhileFetchingHouseData(true)
    ];

    return store.dispatch(fetchListOfHouses(url)).then(() => {
      const actions = store.getActions;
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
