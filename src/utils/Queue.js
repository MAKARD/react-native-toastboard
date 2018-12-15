// @flow
export class Queue {
	active = false;
	list: Array<any> = [];

	onIteration: (item: any) => Promise<any> | void;
	beforeIteration: () => Promise<any> | void;

	constructor(
		onIteration?: () => Promise<any> | void,
		beforeIteration?: () => Promise<any> | void
	) {
		if (typeof onIteration === "function") {
			this.onIteration = onIteration;
		}

		if (typeof beforeIteration === "function") {
			this.beforeIteration = beforeIteration;
		}
	}

	push = (item: any) => {
		this.list.push(item);
	}

	process = async () => {
		await this.beforeIteration();

		if (!this.list.length) {
			this.active = false;
			return;
		}

		this.active = true;

		if (this.onIteration) {
			await this.onIteration(this.list[0]);
		}

		this.list = this.list.slice(1);

		this.process();
	}

	start = () => {
		if (this.active) {
			return;
		}

		this.process();
	}
}
