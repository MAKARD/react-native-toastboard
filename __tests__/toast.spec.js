/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";

import { Toast } from "../src/components/Toast";

describe("<Toast />", () => {
    test("Should render correctly", () => {
        const tree = renderer.create(<Toast message="test" type="INFO" />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
