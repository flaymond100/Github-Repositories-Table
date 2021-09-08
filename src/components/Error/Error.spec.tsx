import * as React from "react";
import { shallow } from "enzyme";
import Error from "./Error";

describe("render Error component", () => {
  test("should render Error component", () => {
    const component = shallow(<Error />);

    expect(component).toMatchSnapshot();
  });
});
