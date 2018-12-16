/* eslint-disable no-undef */
import { Queue } from "../src/utils/Queue";

describe("utils/Queue", () => {
	test("Should set procces callbacks", () => {
		const handleIteration = () => { };
		const handleAfterIteration = () => { };
		const handleBeforeIteration = () => { };

		const queue = new Queue({
			onIteration: handleIteration,
			afterIteration: handleAfterIteration,
			beforeIteration: handleBeforeIteration
		});

		expect(queue.onIteration).toEqual(handleIteration);
		expect(queue.afterIteration).toEqual(handleAfterIteration);
		expect(queue.beforeIteration).toEqual(handleBeforeIteration);
	});

	test("Should add item to list", () => {
		const queue = new Queue();

		queue.push("test");

		expect(queue.list[0]).toBe("test");
	});

	test("Should start process if it not active", () => {
		const queue = new Queue();
		const spy = jest.spyOn(queue, "process");

		queue.push("test");
		queue.start();

		expect(spy).toHaveBeenCalledTimes(2);

		queue.active = true;
		queue.start();

		expect(spy).toHaveBeenCalledTimes(2);
	});

	test("Should stop process", () => {
		const queue = new Queue();
		const spy = jest.spyOn(queue, "process");

		queue.start();
		expect(spy).toHaveBeenCalledTimes(1);

		queue.push("test");
		queue.stop();

		expect(spy).toHaveBeenCalledTimes(1);
	});

	test("Should execute process callbacks on process", async () => {
		let onIterationCalled = false;
		let afterIterationCalled = false;
		let beforeIterationCalled = false;

		const queue = new Queue({
			onIteration: () => { onIterationCalled = true },
			afterIteration: () => { afterIterationCalled = true },
			beforeIteration: () => { beforeIterationCalled = true }
		});

		queue.push("test");
		await queue.start();

		expect(onIterationCalled).toBeTruthy();
		expect(afterIterationCalled).toBeTruthy();
		expect(beforeIterationCalled).toBeTruthy();
	});
});
