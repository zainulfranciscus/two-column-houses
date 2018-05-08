import houseDecorator, { ATTRIBUTE_IS_MISSING } from "./house.decorator";

export const aHouse = {
  price: "$726,500",
  agency: {
    brandingColors: {
      primary: "#ffe512"
    },
    logo: "http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif"
  },
  id: "1",
  mainImage:
    "http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg"
};

const emptyData = {};
const dataWithEmptyAgency = {
  agency: {}
};

let val;

describe("house.decorator unit tests ", () => {
  beforeEach(() => {
    val = houseDecorator(aHouse);
  });

  it("Given a price, then houseDecorator should return the price", () => {
    expect(val.price()).toBe(aHouse.price);
  });

  it("Given an branding color, then houseDecorator should return the primary color", () => {
    expect(val.primaryBrandingColor()).toBe(
      aHouse.agency.brandingColors.primary
    );
  });

  it("Given a logo, then houseDecorator should return the logo url", () => {
    expect(val.logo()).toBe(aHouse.agency.logo);
  });

  it("Given an id, then houseDecorator should return the id", () => {
    expect(val.id()).toBe(aHouse.id);
  });

  it("Given a mainImage, then houseDecorator should return URL of the main image", () => {
    expect(val.mainImage()).toBe(aHouse.mainImage);
  });

  it("When price does not exist, then property decorator should return an unknown price", () => {
    let house = houseDecorator(emptyData);

    expect(house.price()).toBe(ATTRIBUTE_IS_MISSING);
  });

  it("When agency does not exist, then property decorator should return an unknown branding color", () => {
    let house = houseDecorator(emptyData);

    expect(house.primaryBrandingColor()).toBe(ATTRIBUTE_IS_MISSING);
  });

  it("When brandingColors does not exist, then property decorator should return an unknown branding color", () => {
    let house = houseDecorator(dataWithEmptyAgency);

    expect(house.primaryBrandingColor()).toBe(ATTRIBUTE_IS_MISSING);
  });

  it("When agency does not exist, then property decorator should return an unknown logo", () => {
    let house = houseDecorator(emptyData);

    expect(house.logo()).toBe(ATTRIBUTE_IS_MISSING);
  });

  it("When logo does not exist, then property decorator should return an unknown logo", () => {
    let house = houseDecorator(dataWithEmptyAgency);
    expect(house.logo()).toBe(ATTRIBUTE_IS_MISSING);
  });

  it("When id does not exist, then property decorator should return an unknown id", () => {
    let house = houseDecorator(emptyData);

    expect(house.id()).toBe(ATTRIBUTE_IS_MISSING);
  });

  it("When mainImage does not exist, then property decorator should return an unknown mainImage", () => {
    let house = houseDecorator(emptyData);

    expect(house.mainImage()).toBe(ATTRIBUTE_IS_MISSING);
  });
});
