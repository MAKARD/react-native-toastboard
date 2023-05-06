export class Queue<T = unknown> {
  active = false;

  list: Array<T> = [];

  onIteration?: (item: T) => Promise<unknown> | void;

  constructor(props: {
    onIteration?: (item: T) => Promise<unknown> | void;
  } = {}) {
    if (props.onIteration) {
      this.onIteration = props.onIteration;
    }
  }

  push = (item: T) => {
    this.list.push(item);
  };

  process = async () => {
    if (!this.active) {
      return;
    }

    if (!this.list.length) {
      this.active = false;

      return;
    }

    if (this.onIteration) {
      await this.onIteration(this.list[0]);
    }

    this.list = this.list.slice(1);

    this.process();
  };

  start = () => {
    if (this.active) {
      return;
    }

    this.active = true;

    return this.process();
  };

  stop = () => {
    this.active = false;
  };
}
