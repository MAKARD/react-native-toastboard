"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue {
    constructor(props = {}) {
        this.active = false;
        this.list = [];
        this.push = (item) => {
            this.list.push(item);
        };
        this.process = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.active) {
                return;
            }
            if (!this.list.length) {
                this.active = false;
                return;
            }
            if (this.onIteration) {
                yield this.onIteration(this.list[0]);
            }
            this.list = this.list.slice(1);
            this.process();
        });
        this.start = () => {
            if (this.active) {
                return;
            }
            this.active = true;
            return this.process();
        };
        this.stop = () => {
            this.active = false;
        };
        if (props.onIteration) {
            this.onIteration = props.onIteration;
        }
    }
}
exports.Queue = Queue;
