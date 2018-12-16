/* eslint-disable no-undef */
import React from "react";

import { Opacity, SlideX, SlideY } from "../animations";

jest.mock("react-native", () => ({
	Animated: {
		Value: () => { },
		timing: () => ({ start: () => { } })
	}
}))

describe("animations", () => {
	test("Should set initial values", () => {
		const opacity = new Opacity(0, 1, { duration: 1 });
		const slideX = new SlideX(2, 3, { duration: 2 });
		const slideY = new SlideY(4, 5, { duration: 3 });

		expect(opacity.config.duration).toBe(1);
		expect(opacity.from).toBe(0);
		expect(opacity.to).toBe(1);

		expect(slideX.config.duration).toBe(2);
		expect(slideX.from).toBe(2);
		expect(slideX.to).toBe(3);

		expect(slideY.config.duration).toBe(3);
		expect(slideY.from).toBe(4);
		expect(slideY.to).toBe(5);
	});

	test("Should return promise on backward/forward", () => {
		const opacity = new Opacity(0, 1);
		const slideX = new SlideX(2, 3);
		const slideY = new SlideY(4, 5);

		expect(opacity.backward()).toBeInstanceOf(Promise);
		expect(opacity.forward()).toBeInstanceOf(Promise);

		expect(slideX.backward()).toBeInstanceOf(Promise);
		expect(slideX.forward()).toBeInstanceOf(Promise);

		expect(slideY.backward()).toBeInstanceOf(Promise);
		expect(slideY.forward()).toBeInstanceOf(Promise);
	});

	test("Should return specific object on getAnimation() according to animation type", () => {
		const opacity = new Opacity(0, 1);
		const slideX = new SlideX(2, 3);
		const slideY = new SlideY(4, 5);

		expect(opacity.getAnimation()).toMatchObject({
			opacity: {}
		});

		expect(slideX.getAnimation()).toMatchObject({
			transform: [{ translateX: {} }]
		});

		expect(slideY.getAnimation()).toMatchObject({
			transform: [{ translateY: {} }]
		});
	});
});
