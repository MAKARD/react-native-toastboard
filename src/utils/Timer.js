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

			let timeout = setTimeout(resolve, delay);

			this.stop = () => {
				resolve();
				clearTimeout(timeout);

				this.pause = () => { };
				this.resume = () => { };
			};

			this.pause = () => {
				remaining -= Date.now() - time;
				if (remaining <= 0) {
					return this.stop();
				}

				clearTimeout(timeout);
			};

			this.resume = () => {
				if (remaining <= 0) {
					return this.stop();
				}

				timeout = setTimeout(this.stop, remaining);
			};
		});
	}
}
