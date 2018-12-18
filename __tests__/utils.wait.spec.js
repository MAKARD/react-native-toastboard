/* eslint-disable no-undef */
import { wait } from "../src/utils/wait";

describe("utils/wait", () => {
	test("Should resolve promise after 2000 sec delay", () => {
		jest.useFakeTimers();

		wait();
		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);

		jest.clearAllTimers();
	});

	test("Should resolve promise after specified delay", () => {
		jest.useFakeTimers();

		wait(100);
		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);

		jest.clearAllTimers();
	});
});
