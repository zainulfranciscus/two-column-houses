import { aHouse } from "./house.decorator.test";
import listOfHousesDecorator, {
  LEFT_COLUMN_HOUSES_PROPERTY_NAME,
  RIGHT_COLUMN_HOUSES_PROPERTY_NAME
} from "./list.of.houses.decorator";

describe("unit test for list of houses decorator", () => {
  const listOfHouses = {};

  beforeEach(() => {
    listOfHouses[LEFT_COLUMN_HOUSES_PROPERTY_NAME] = [aHouse];
    listOfHouses[RIGHT_COLUMN_HOUSES_PROPERTY_NAME] = [aHouse];
  });

  it("given a list of houses, then leftColumnHouses should return array under results", () => {
    const housesInLeftColumn = listOfHousesDecorator(
      listOfHouses
    ).leftColumnHouses();
    expect(housesInLeftColumn).toBe(
      listOfHouses[LEFT_COLUMN_HOUSES_PROPERTY_NAME]
    );
  });

  it("given results is undefined then leftColumnHouses should return an empty array ", () => {
    const housesInLeftColumn = listOfHousesDecorator({}).leftColumnHouses();
    expect(housesInLeftColumn.length).toBe(0);
  });

  it("given a list of houses, then rightColumnHouses should return array under saved", () => {
    const housesInRightColumn = listOfHousesDecorator(
      listOfHouses
    ).rightColumnHouses();
    expect(housesInRightColumn).toBe(
      listOfHouses[RIGHT_COLUMN_HOUSES_PROPERTY_NAME]
    );
  });

  it("given saved is undefined then rightColumnHouses should return an empty array ", () => {
    const housesInRightColumn = listOfHousesDecorator({}).rightColumnHouses();
    expect(housesInRightColumn.length).toBe(0);
  });

  it("Should remove a house with a matching id from the right column", () => {
    const houses = listOfHousesDecorator(
      listOfHouses
    ).removeHouseFromTheRightColumn(aHouse);
    expect(listOfHousesDecorator(houses).rightColumnHouses().length).toBe(0);
  });

  it("No houses should be removed from the right column because the given house id does  not match with any of the houses in the right column", () => {
    const houseToBeRemoved = Object.assign({}, aHouse);
    houseToBeRemoved.id = 5;

    const houses = listOfHousesDecorator(
      listOfHouses
    ).removeHouseFromTheRightColumn(houseToBeRemoved);
    expect(listOfHousesDecorator(houses).rightColumnHouses()).toBe(
      listOfHouses[RIGHT_COLUMN_HOUSES_PROPERTY_NAME]
    );
  });
});
