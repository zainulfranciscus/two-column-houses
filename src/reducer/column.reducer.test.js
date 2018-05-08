import columnReducer from "./column.reducer";
import {
  fetchHouseActionBuilder,
  HOUSES
} from "../actions/fetch.houses.actions";
import { aHouse } from "../data/house.decorator.test";
import listOfHousesDecorator from "../data/list.of.houses.decorator";
import {
  MOVE_HOUSE_TO_LEFT_COLUMN,
  MOVE_HOUSE_TO_RIGHT_COLUMN,
  moveHouseActionBuilder
} from "../actions/move.houses.actions";

describe("unit tests for left column reducer ", () => {
  const houses = {
    results: [aHouse],
    saved: [aHouse]
  };

  it(
    "Given that list of houses has been successfully fetched, " +
      "then this reducer should return houses under results, and saved column ",
    () => {
      const action = fetchHouseActionBuilder()
        .withHouses(houses)
        .build();

      const state = columnReducer({}, action);

      expect(listOfHousesDecorator(state).leftColumnHouses()).toEqual(
        listOfHousesDecorator(action[HOUSES]).leftColumnHouses()
      );
      expect(listOfHousesDecorator(state).rightColumnHouses()).toEqual(
        listOfHousesDecorator(action[HOUSES]).rightColumnHouses()
      );
    }
  );

  it("Given that payload type is MOVE_TO_RIGHT_COLUMN then the reducer should add a house to the saved result column", () => {
    const houses = {
      results: [aHouse],
      saved: []
    };

    const moveHouseAction = moveHouseActionBuilder()
      .withType(MOVE_HOUSE_TO_RIGHT_COLUMN)
      .withHouse(aHouse)
      .build();
    const afterState = columnReducer(houses, moveHouseAction);
    expect(listOfHousesDecorator(afterState).leftColumnHouses()).toBe(
      listOfHousesDecorator(houses).leftColumnHouses()
    );
    expect(listOfHousesDecorator(afterState).rightColumnHouses()).toEqual([
      aHouse
    ]);
  });

  it(
    "Given that payload type is MOVE_HOUSE_TO_RIGHT_COLUMN then the reducer should not add the house to the right column" +
      " because a house with a matching already exist in the right column",
    () => {
      const moveHouseAction = moveHouseActionBuilder()
        .withType(MOVE_HOUSE_TO_RIGHT_COLUMN)
        .withHouse(aHouse)
        .build();
      const afterState = columnReducer(houses, moveHouseAction);
      expect(listOfHousesDecorator(afterState).leftColumnHouses()).toBe(
        listOfHousesDecorator(houses).leftColumnHouses()
      );
      expect(listOfHousesDecorator(afterState).rightColumnHouses()).toEqual([
        aHouse
      ]);
    }
  );

  it("Given that payload type is MOVE_HOUSE_TO_LEFT_COLUMN then the reducer should remove a house with a matching id in the right column", () => {
    const moveHouseAction = moveHouseActionBuilder()
      .withType(MOVE_HOUSE_TO_LEFT_COLUMN)
      .withHouse(aHouse)
      .build();
    const afterState = columnReducer(houses, moveHouseAction);
    expect(listOfHousesDecorator(afterState).leftColumnHouses()).toBe(
      listOfHousesDecorator(houses).leftColumnHouses()
    );
    expect(listOfHousesDecorator(afterState).rightColumnHouses().length).toBe(
      0
    );
  });
});
