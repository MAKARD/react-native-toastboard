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
const Queue_1 = require("../Queue");
describe('Queue', () => {
    test('Should set process callbacks', () => {
        const handleIteration = jest.fn();
        const queue = new Queue_1.Queue({
            onIteration: handleIteration,
        });
        expect(queue.onIteration).toEqual(handleIteration);
    });
    test('Should add item to list', () => {
        const queue = new Queue_1.Queue();
        queue.push('test');
        expect(queue.list[0]).toBe('test');
    });
    test('Should start process if it not active', () => {
        const queue = new Queue_1.Queue();
        const spy = jest.spyOn(queue, 'process');
        queue.push('test');
        queue.start();
        expect(spy).toHaveBeenCalledTimes(2);
        queue.active = true;
        queue.start();
        expect(spy).toHaveBeenCalledTimes(2);
    });
    test('Should stop process', () => {
        const queue = new Queue_1.Queue();
        const spy = jest.spyOn(queue, 'process');
        queue.start();
        expect(spy).toHaveBeenCalledTimes(1);
        queue.push('test');
        queue.stop();
        expect(spy).toHaveBeenCalledTimes(1);
    });
    test('Should execute process callbacks on process', () => __awaiter(void 0, void 0, void 0, function* () {
        const onIteration = jest.fn();
        const queue = new Queue_1.Queue({
            onIteration,
        });
        queue.push('test');
        yield queue.start();
        expect(onIteration).toHaveBeenCalledWith('test');
    }));
});
