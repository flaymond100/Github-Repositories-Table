import * as React from "react";
import { shallow } from 'enzyme';
import LoadingPage from "./Loading";

it ('should be valid', () => {
  const component = shallow( <LoadingPage /> );
  const wrapper = component.find(".CircularWrapper");
  expect(wrapper.length).toBe(1);
});
