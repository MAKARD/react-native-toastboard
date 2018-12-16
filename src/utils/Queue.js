// @flow
export class Queue {
	active = false;
	list: Array<any> = [];

	onIteration: (item: any) => Promise<any> | void;
	beforeIteration: () => Promise<any> | void;
	afterIteration: () => Promise<any> | void;

	constructor(props: {
		onIteration?: () => Promise<any> | void;
		beforeIteration?: () => Promise<any> | void;
		afterIteration?: () => Promise<any> | void;
	} = {}) {
		if (typeof props.onIteration === "function") {
			this.onIteration = props.onIteration;
		}

		if (typeof props.beforeIteration === "function") {
			this.beforeIteration = props.beforeIteration;
		}

		if (typeof props.afterIteration === "function") {
			this.afterIteration = props.afterIteration;
		}

	}

	push = (item: any) => {
		this.list.push(item);
	}

	process = async () => {
		this.active = true;

		if (this.beforeIteration) {
			await this.beforeIteration();
		}

		if (!this.list.length) {
			this.active = false;
			return;
		}

		if (this.onIteration) {
			await this.onIteration(this.list[0]);
		}

		this.list = this.list.slice(1);

		if (this.afterIteration) {
			await this.afterIteration();
		}

		this.process();
	}

	start = () => {
		if (this.active) {
			return;
		}

		this.process();
	}
}
