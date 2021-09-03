import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import LoadingPage from "./Loading";

const setUp = () => shallow(<LoadingPage />);

describe("render LoadingPage component", () => {
  let component: ShallowWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >;

  beforeEach(() => {
    component = setUp();
  });

  it("should contain CircularWrapper", () => {
    const wrapper = component.find(".CircularWrapper");

    expect(wrapper).toHaveLength(1);
  });

  it("should contain h3", () => {
    const wrapper = component.find("h3");

    expect(wrapper).toHaveLength(1);
  });
});
