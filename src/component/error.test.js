import React from "react";
import { shallow } from "enzyme";

import Error, { ERROR_MESSAGE_ID, ERROR_MESSAGE } from "./error";

describe("unit test for Error component", () => {
  it("should render an error message when hasErrored is true", () => {
    const wrapper = shallow(<Error hasErrored={true} />);
    const error = findErrorDiv(wrapper);
    expect(error.length).toBe(1);
    expect(error.text()).toBe(ERROR_MESSAGE);
  });

  it("should not render an error message when hasErrored is false", () => {
    const wrapper = shallow(<Error hasErrored={false} />);
    const error = findErrorDiv(wrapper);
    expect(error.length).toBe(0);
  });

  it("should not render an error message when hasErrored is null", () => {
    const wrapper = shallow(<Error hasErrored={null} />);
    const error = findErrorDiv(wrapper);
    expect(error.length).toBe(0);
  });

  it("should not render an error message when hasErrored is not defined", () => {
    const wrapper = shallow(<Error />);
    const error = findErrorDiv(wrapper);
    expect(error.length).toBe(0);
  });

  function findErrorDiv(wrapper) {
    return wrapper.find("#" + ERROR_MESSAGE_ID);
  }
});
