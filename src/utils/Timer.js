// @flow

export class Timer {
	delay: number;
	time: number;

	stop: () => void = () => {};

	/* eslint-disable-next-line no-magic-numbers */
	start = (delay: number = 2000): Promise<void> => {
		return new Promise((resolve) => {
			if (delay <= 0) {
				return resolve();
			}

			this.delay = delay;
			this.time = Date.now();
			const timeout = setTimeout(resolve, this.delay);

			this.stop = () => {
				resolve();
				clearTimeout(timeout);
				this.delay = 0;
			};
		});
	}

	pause = () => {
		this.delay = Date.now() - this.time;
		this.stop();
	}

	resume = () => {
		this.start(this.delay);
	}

}
