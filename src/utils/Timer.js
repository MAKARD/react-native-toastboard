"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
class Timer {
    constructor() {
        this.stop = () => { };
        this.pause = () => { };
        this.resume = () => { };
        this.start = (delay = Timer.defaultDelay) => {
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
    static wait(msec = Timer.defaultDelay) {
        return new Promise((resolve) => setTimeout(resolve, msec));
    }
}
Timer.defaultDelay = 2000;
exports.Timer = Timer;
