import React from "react";
import { HouseColumn, LEFT_COLUMN_ID, RIGHT_COLUMN_ID } from "./house.column";
import { findButton } from "../component/house.test";
import { aHouse } from "../data/house.decorator.test";
import { PREFIX_FOR_HOUSE_CONTAINER } from "../component/house";
import { mount } from "enzyme";
import {
  LEFT_COLUMN_HOUSES_PROPERTY_NAME,
  RIGHT_COLUMN_HOUSES_PROPERTY_NAME
} from "../data/list.of.houses.decorator";

describe("Unit tests for HouseColumn container ", () => {
  const leftColumnHousesOnly = {};
  leftColumnHousesOnly[LEFT_COLUMN_HOUSES_PROPERTY_NAME] = [aHouse];

  const rightColumnHousesOnly = {};
  rightColumnHousesOnly[RIGHT_COLUMN_HOUSES_PROPERTY_NAME] = [aHouse];

  it("when the container is given an empty list of houses, then no houses should be rendered", () => {
    const wrapper = mount(<HouseColumn houses={null} />);

    expect(housesInTheLeftColumn(wrapper).length).toBe(0);
    expect(housesInTheRightColumn(wrapper).length).toBe(0);
  });

  it("when the container is given an empty object of houses, then no houses should be rendered", () => {
    const wrapper = mount(<HouseColumn houses={{}} />);

    expect(housesInTheLeftColumn(wrapper).length).toBe(0);
    expect(housesInTheRightColumn(wrapper).length).toBe(0);
  });

  it("when the container is given a house into the left column, then 1 house should be rendered in the left column", () => {
    const wrapper = mount(<HouseColumn houses={leftColumnHousesOnly} />);

    expect(housesInTheLeftColumn(wrapper).length).toBe(1);
    expect(housesInTheRightColumn(wrapper).length).toBe(0);
  });

  it("when the container is given a house into the right column, then 1 house should be rendered in the right column", () => {
    const wrapper = mount(<HouseColumn houses={rightColumnHousesOnly} />);

    expect(housesInTheLeftColumn(wrapper).length).toBe(0);
    expect(housesInTheRightColumn(wrapper).length).toBe(1);
  });

  it("mock fetchListOfHouses should be called when component is mounted", () => {
    let mockFetchListOfHouses = jest.fn();
    mount(<HouseColumn fetchListOfHouses={mockFetchListOfHouses} />);
    expect(mockFetchListOfHouses.mock.calls.length).toBe(1);
  });

  it("when button is clicked then, the moveHouseToTheRightColumn is called ", () => {
    let moveHouseToTheRightColumn = jest.fn();
    const wrapper = mount(
      <HouseColumn
        houses={leftColumnHousesOnly}
        moveHouseToTheRightColumn={moveHouseToTheRightColumn}
      />
    );
    findButton(wrapper).simulate("click");
    expect(moveHouseToTheRightColumn.mock.calls.length).toBe(1);
  });

  it("when button is clicked then, the moveHouseToTheLeftColumn is called ", () => {
    let moveHouseToTheLeftColumn = jest.fn();
    const wrapper = mount(
      <HouseColumn
        houses={rightColumnHousesOnly}
        moveHouseToTheLeftColumn={moveHouseToTheLeftColumn}
      />
    );
    findButton(wrapper).simulate("click");
    expect(moveHouseToTheLeftColumn.mock.calls.length).toBe(1);
  });

  function housesInTheLeftColumn(wrapper) {
    const SELECTOR_FOR_CONTAINER_OF_LEFT_COLUMN_HOUSES =
      "div#" +
      LEFT_COLUMN_ID +
      " div[id^='" +
      PREFIX_FOR_HOUSE_CONTAINER +
      "']";

    return wrapper.find(SELECTOR_FOR_CONTAINER_OF_LEFT_COLUMN_HOUSES);
  }

  function housesInTheRightColumn(wrapper) {
    const SELECTOR_FOR_CONTAINER_OF_RIGHT_COLUMN_HOUSES =
      "div#" +
      RIGHT_COLUMN_ID +
      " div[id^='" +
      PREFIX_FOR_HOUSE_CONTAINER +
      "']";

    return wrapper.find(SELECTOR_FOR_CONTAINER_OF_RIGHT_COLUMN_HOUSES);
  }
});
