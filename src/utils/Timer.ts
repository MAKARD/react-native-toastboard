export class Timer {
  static readonly defaultDelay: number = 2000;

  static wait(msec = Timer.defaultDelay): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, msec));
  }

  stop: () => void = () => { };

  pause: () => void = () => { };

  resume: () => void = () => { };

  start = (delay = Timer.defaultDelay): Promise<void> => {
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
  };
}
