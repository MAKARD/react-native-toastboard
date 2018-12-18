// @flow
export class Timer {
	stop: () => void = () => { };
	pause: () => void = () => { };
	resume: () => void = () => { };

	/* eslint-disable-next-line no-magic-numbers */
	start = (delay: number = 2000): Promise<void> => {
		return new Promise((resolve) => {
			if (delay <= 0) {
				return resolve();
			}

			const time = Date.now();
			let remaining = delay;

			let timeout = setTimeout(() => this.stop(), delay);

			this.stop = () => {
				resolve();
				clearTimeout(timeout);

				this.pause = () => { };
				this.resume = () => { };
			};

			this.pause = () => {
				remaining -= Date.now() - time;

				clearTimeout(timeout);
			};

			this.resume = () => {

				timeout = setTimeout(this.stop, remaining);
			};
		});
	}
}
