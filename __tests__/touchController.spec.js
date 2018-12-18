/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";

import { TouchController } from "../src/components/TouchController";

describe("<TouchController />", () => {
	test("Should render correctly", () => {
		const tree = renderer.create(
			<TouchController
				onPress={() => { }}
				onHoldEnd={() => { }}
				onHoldStart={() => { }}
			/>
		).toJSON();

		expect(tree).toMatchSnapshot();
	});

	test("Should detect pressEvent", () => {
		let holdEnd = false;
		let press = false;

		const tree = renderer.create(
			<TouchController
				onPress={() => { press = true }}
				onHoldEnd={() => { holdEnd = true }}
				onHoldStart={() => { }}
			/>
		);

		tree.getInstance().hanldePressOut();

		expect(holdEnd).toBeTruthy();
		expect(press).toBeFalsy();

		const dateOrigin = global.Date;

		global.Date = {
			now: () => 0
		};

		tree.getInstance().handlePressIn();
		tree.getInstance().hanldePressOut();

		expect(press).toBeTruthy();

		global.Date = dateOrigin;
	});

	test("Should start timeout on pressIn", () => {
		jest.useFakeTimers();

		const tree = renderer.create(
			<TouchController
				pressEventDuration={20}
				onPress={() => { }}
				onHoldEnd={() => { }}
				onHoldStart={() => { }}
			/>
		);

		tree.getInstance().handlePressIn();
		jest.advanceTimersByTime(1000);
		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 20);

		jest.clearAllTimers();
	});
});
