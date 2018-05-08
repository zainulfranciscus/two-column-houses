import React from "react";
import { shallow } from "enzyme";
import Loading, { MESSAGE_WHILE_LOADING, ID_OF_LOADER } from "./loading";

const findLoaderDiv = wrapper => {
  return wrapper.find("#" + ID_OF_LOADER);
};

describe("Unit tests for loading component", () => {
  it("it should render a text when fetchingData is true", () => {
    const wrapper = shallow(<Loading fetchingData={true} />);
    expect(findLoaderDiv(wrapper).length).toBe(1);
    expect(findLoaderDiv(wrapper).text()).toBe(MESSAGE_WHILE_LOADING);
  });

  it("it should render a text when fetchingData is false", () => {
    const wrapper = shallow(<Loading fetchingData={false} />);
    expect(findLoaderDiv(wrapper).length).toBe(0);
  });

  it("it should render a text when fetchingData is null", () => {
    const wrapper = shallow(<Loading fetchingData={null} />);
    expect(findLoaderDiv(wrapper).length).toBe(0);
  });

  it("it should render a text when fetchingData is undefined", () => {
    const wrapper = shallow(<Loading />);
    expect(findLoaderDiv(wrapper).length).toBe(0);
  });

  it("it should not render a text when error occured in the application", () => {
    const wrapper = shallow(<Loading hasErrored={true} />);
    expect(findLoaderDiv(wrapper).length).toBe(0);
  });
});
