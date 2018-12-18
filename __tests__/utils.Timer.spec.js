/* eslint-disable no-undef */
import { Timer } from "../src/utils/Timer";

describe("utils/Timer", () => {
	test("Should resolve promise immediately if delay less than 0", () => {
		jest.useFakeTimers();

		const timer = new Timer();

		timer.start(0);
		expect(setTimeout).not.toHaveBeenCalled();

		timer.start(-1);
		expect(setTimeout).not.toHaveBeenCalled();

		jest.clearAllTimers();
	});

	test("Should resolve promise after specified delay", () => {
		jest.useFakeTimers();

		const timer = new Timer();

		timer.start(100);

		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);

		jest.clearAllTimers();
	});

	test("Should resolve promise immediately after stop", () => {
		jest.useFakeTimers();

		const timer = new Timer();

		timer.start(100);
		timer.stop();

		expect(clearTimeout).toHaveBeenCalledTimes(1);

		jest.clearAllTimers();
	});

	test("Should do nothing if timer is not active", () => {
		jest.useFakeTimers();

		const timer = new Timer();

		timer.stop();
		timer.pause();
		timer.resume();

		expect(clearTimeout).not.toHaveBeenCalled();
		expect(setTimeout).not.toHaveBeenCalled();

		jest.clearAllTimers();
	});

	test("Should clear hanlders after stop", () => {
		jest.useFakeTimers();

		const timer = new Timer();

		timer.start(100);
		timer.stop();

		expect(clearTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenCalledTimes(1);

		timer.pause();
		timer.resume();

		expect(clearTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenCalledTimes(1);

		jest.clearAllTimers();
	});

	test("Should pause timer", () => {
		jest.useFakeTimers();

		const timer = new Timer();

		timer.start(100);
		timer.pause();

		expect(clearTimeout).toHaveBeenCalledTimes(1);

		jest.clearAllTimers();
	});

	test("Should resume timer", () => {
		jest.useFakeTimers();

		const timer = new Timer();

		timer.start(100);
		timer.pause();

		expect(clearTimeout).toHaveBeenCalledTimes(1);

		timer.resume();

		expect(setTimeout).toHaveBeenCalledTimes(2);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);

		jest.clearAllTimers();
	});
});
