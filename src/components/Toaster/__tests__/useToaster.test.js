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
const react_hooks_1 = require("@testing-library/react-hooks");
const useToaster_1 = require("../useToaster");
const animations_1 = require("../../../animations");
const defaultParams = {
    animation: new animations_1.SlideX(0, 1, {
        duration: 0,
    }),
};
describe('useToaster', () => {
    jest.useFakeTimers();
    test('Should warn in console if Toaster is not instantiated', () => {
        jest.spyOn(console, 'warn').mockImplementationOnce(() => { });
        useToaster_1.StaticMethods.debug('test');
        // eslint-disable-next-line no-console
        expect(console.warn).toHaveBeenCalledWith('Toaster should be rendered before creating message');
    });
    test('Should set activeToastItem via static methods', () => __awaiter(void 0, void 0, void 0, function* () {
        const duration = 100;
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(defaultParams));
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', duration);
        });
        expect(result.current.activeToastItem).toStrictEqual({
            type: 'DEBUG',
            message: 'debug',
            duration,
        });
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(duration);
        }));
        expect(result.current.activeToastItem).toBe(undefined);
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.error('error', duration);
        });
        expect(result.current.activeToastItem).toStrictEqual({
            type: 'ERROR',
            message: 'error',
            duration,
        });
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(duration);
        }));
        expect(result.current.activeToastItem).toBe(undefined);
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.info('info', duration);
        });
        expect(result.current.activeToastItem).toStrictEqual({
            type: 'INFO',
            message: 'info',
            duration,
        });
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(duration);
        }));
        expect(result.current.activeToastItem).toBe(undefined);
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.success('success', duration);
        });
        expect(result.current.activeToastItem).toStrictEqual({
            type: 'SUCCESS',
            message: 'success',
            duration,
        });
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(duration);
        }));
        expect(result.current.activeToastItem).toBe(undefined);
    }));
    test('Should close toast on press if hideOnPress is true', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(Object.assign(Object.assign({}, defaultParams), { hideOnPress: true })));
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', 100);
        });
        expect(result.current.activeToastItem).toBeDefined();
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(0);
            result.current.onPress({});
        }));
        expect(result.current.activeToastItem).toBe(undefined);
    }));
    test('Should not close toast on press if hideOnPress is false', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(Object.assign(Object.assign({}, defaultParams), { hideOnPress: false })));
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', 100);
        });
        expect(result.current.activeToastItem).toBeDefined();
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(0);
            result.current.onPress({});
        }));
        expect(result.current.activeToastItem).toBeDefined();
    }));
    test('Should call onPress on press', () => {
        const onPress = jest.fn();
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(Object.assign(Object.assign({}, defaultParams), { onPress, hideOnPress: false })));
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', 100);
        });
        (0, react_hooks_1.act)(() => {
            result.current.onPress({});
        });
        expect(onPress).toHaveBeenCalledWith({}, {
            duration: 100,
            message: 'debug',
            type: 'DEBUG',
        });
    });
    test('Should pause toast on press until user removes touch', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(defaultParams));
        const duration = 100;
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', duration);
        });
        const timeLeft = duration / 2;
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(timeLeft);
        }));
        (0, react_hooks_1.act)(() => {
            result.current.onHoldStart({});
        });
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(duration + 1);
        }));
        expect(result.current.activeToastItem).toBeDefined();
        (0, react_hooks_1.act)(() => {
            result.current.onHoldEnd({});
        });
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(timeLeft - 1);
        }));
        expect(result.current.activeToastItem).toBeDefined();
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(1);
        }));
        expect(result.current.activeToastItem).toBe(undefined);
    }));
    test('Should call onHoldStart on holdStart', () => {
        const onHoldStart = jest.fn();
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(Object.assign(Object.assign({}, defaultParams), { onHoldStart })));
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', 100);
            result.current.onHoldStart({});
        });
        expect(onHoldStart).toHaveBeenCalledWith({}, {
            duration: 100,
            message: 'debug',
            type: 'DEBUG',
        });
    });
    test('Should call onHoldEnd on holdEnd', () => {
        const onHoldEnd = jest.fn();
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(Object.assign(Object.assign({}, defaultParams), { onHoldEnd })));
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', 100);
            result.current.onHoldEnd({});
        });
        expect(onHoldEnd).toHaveBeenCalledWith({}, {
            duration: 100,
            message: 'debug',
            type: 'DEBUG',
        });
    });
    test('Should call onShow when toast is shown', () => {
        const onShow = jest.fn();
        (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(Object.assign(Object.assign({}, defaultParams), { onShow })));
        expect(onShow).not.toHaveBeenCalled();
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', 100);
        });
        expect(onShow).toHaveBeenCalledWith({
            duration: 100,
            message: 'debug',
            type: 'DEBUG',
        });
    });
    test('Should call onHide before toast gets hidden', () => __awaiter(void 0, void 0, void 0, function* () {
        const onHide = jest.fn();
        (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(Object.assign(Object.assign({}, defaultParams), { onHide })));
        expect(onHide).not.toHaveBeenCalled();
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', 100);
        });
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(100);
        }));
        expect(onHide).toHaveBeenCalledWith({
            duration: 100,
            message: 'debug',
            type: 'DEBUG',
        });
    }));
    test('Should make delay between toast if delayBetween is specified', () => __awaiter(void 0, void 0, void 0, function* () {
        const delayBetween = 66;
        const duration = 50;
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(Object.assign(Object.assign({}, defaultParams), { delayBetween })));
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', duration);
            useToaster_1.StaticMethods.info('info', duration);
        });
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(duration - 1);
        }));
        expect(result.current.activeToastItem).toStrictEqual({
            duration,
            message: 'debug',
            type: 'DEBUG',
        });
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(1);
        }));
        expect(result.current.activeToastItem).toBe(undefined);
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(delayBetween);
        }));
        expect(result.current.activeToastItem).toStrictEqual({
            duration,
            message: 'info',
            type: 'INFO',
        });
        yield (0, react_hooks_1.act)(() => __awaiter(void 0, void 0, void 0, function* () {
            yield jest.advanceTimersByTimeAsync(duration);
        }));
        expect(result.current.activeToastItem).toBe(undefined);
    }));
    it('Should apply middleware to message', () => {
        var _a;
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useToaster_1.useToaster)(Object.assign(Object.assign({}, defaultParams), { middleware: (item) => {
                return JSON.stringify(item);
            } })));
        (0, react_hooks_1.act)(() => {
            useToaster_1.StaticMethods.debug('debug', 100);
        });
        expect((_a = result.current.activeToastItem) === null || _a === void 0 ? void 0 : _a.message).toBe(JSON.stringify({
            message: 'debug',
            type: 'DEBUG',
            duration: 100,
        }));
    });
});
