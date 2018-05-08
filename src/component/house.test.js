import React from "react";
import renderer from "react-test-renderer";
import House, {
  PREFIX_FOR_MOVE_BTN_ID,
  CSS_CLASS_FOR_HIDING_BUTTON,
  PREFIX_FOR_LOGO_ID,
  PREFIX_FOR_LOGO_CONTAINER_ID,
  PREFIX_FOR_PRICE_ID,
  PRICE_HAS_NOT_BEEN_SPECIFIED,
  PREFIX_FOR_IMG_ID,
  PREFIX_FOR_HOUSE_CONTAINER,
  generateID
} from "./house";
import { aHouse } from "../data/house.decorator.test";
import { shallow } from "enzyme";

export function findButton(wrapper) {
  return wrapper.find("#" + generateID(PREFIX_FOR_MOVE_BTN_ID, aHouse.id));
}

describe("house component unit tests", () => {
  const mockMoveHouseFN = jest.fn();
  let wrapper;
  const MOUSE_OVER_EVENT = "mouseover";
  const MOUSE_LEAVE_EVENT = "mouseleave";

  beforeEach(() => {
    wrapper = shallow(
      <House data={aHouse} buttonText={"add"} moveHouse={mockMoveHouseFN} />
    );
  });

  it("house component should match the most up to date snapshot", () => {
    const houseComponentSnapshot = renderer
      .create(<House data={aHouse} buttonText={"add"} />)
      .toJSON();
    expect(houseComponentSnapshot).toMatchSnapshot();
  });

  it("clicking on a button will trigger moveHouse mock function", () => {
    const button = findButton(wrapper);
    button.simulate("click");

    expect(mockMoveHouseFN.mock.calls.length).toBe(1);
  });

  it("hovering a mouse on the component display the button", () => {
    wrapper.simulate(MOUSE_OVER_EVENT);
    const button = findButton(wrapper);
    expect(button.hasClass(CSS_CLASS_FOR_HIDING_BUTTON)).toBeFalsy();
  });

  it("when mouse pointer leaves the component, then the button disappear", () => {
    wrapper.simulate(MOUSE_OVER_EVENT);
    wrapper.simulate(MOUSE_LEAVE_EVENT);
    const button = findButton(wrapper);
    expect(button.hasClass(CSS_CLASS_FOR_HIDING_BUTTON)).toBeTruthy();
  });

  it("given a house without a logo, then the a blank logo should be rendered", () => {
    let houseObj = Object.assign({}, aHouse);
    delete houseObj.agency.logo;

    let houseComponent = shallow(
      <House data={houseObj} buttonText={"add"} moveHouse={mockMoveHouseFN} />
    );
    const logoImageID = "#" + generateID(PREFIX_FOR_LOGO_ID, houseObj.id);
    expect(houseComponent.find(logoImageID).length).toBe(0);
  });

  it("given a house without an agency attribute, then a blank logo should be rendered", () => {
    let houseObj = Object.assign({}, aHouse);
    delete houseObj.agency;

    let houseComponent = shallow(
      <House data={houseObj} buttonText={"add"} moveHouse={mockMoveHouseFN} />
    );
    const logoImageID =
      "#" + generateID(PREFIX_FOR_LOGO_CONTAINER_ID, houseObj.id);
    expect(houseComponent.find(logoImageID).length).toBe(0);
  });

  it("given a house without a price attribute, then PRICE_HAS_NOT_BEEN_SPECIFIED should be rendered ", () => {
    let houseObj = Object.assign({}, aHouse);
    delete houseObj.price;

    let houseComponent = shallow(
      <House data={houseObj} buttonText={"add"} moveHouse={mockMoveHouseFN} />
    );
    const priceContainerID = "#" + generateID(PREFIX_FOR_PRICE_ID, houseObj.id);
    expect(houseComponent.find(priceContainerID).text()).toBe(
      PRICE_HAS_NOT_BEEN_SPECIFIED
    );
  });

  it("given a house without a house image, then house image should not be rendered", () => {
    let houseObj = Object.assign({}, aHouse);
    delete houseObj.mainImage;

    let houseComponent = shallow(
      <House data={houseObj} buttonText={"add"} moveHouse={mockMoveHouseFN} />
    );
    const imageContainerID = "#" + generateID(PREFIX_FOR_IMG_ID, houseObj.id);
    expect(houseComponent.find(imageContainerID).length).toBe(0);
  });

  it("given a house without an id, the no house will be rendered", () => {
    let houseObj = Object.assign({}, aHouse);
    delete houseObj.id;

    let houseComponent = shallow(
      <House data={houseObj} buttonText={"add"} moveHouse={mockMoveHouseFN} />
    );
    expect(
      houseComponent.find(
        "#" + generateID(PREFIX_FOR_HOUSE_CONTAINER, houseObj.id)
      ).length
    ).toBe(0);
  });
});
