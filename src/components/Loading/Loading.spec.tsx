import * as React from "react";
import { shallow } from "enzyme";
import Loading from "./Loading";

describe("render LoadingPage component", () => {
  test("should render LoadingPage component", () => {
    const component = shallow(<Loading />);

    expect(component).toMatchSnapshot();
  });
});
