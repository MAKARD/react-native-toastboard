"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_hooks_1 = require("@testing-library/react-hooks");
const useTouchController_1 = require("../useTouchController");
const defaultParams = {
    onPress: jest.fn(),
    onHoldEnd: jest.fn(),
    onHoldStart: jest.fn(),
};
describe('useTouchController', () => {
    jest.useFakeTimers();
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('Should call onHoldStart on pressIn after specified threshold', () => {
        const pressEventDuration = 100;
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useTouchController_1.useTouchController)(Object.assign(Object.assign({}, defaultParams), { pressEventDuration })));
        (0, react_hooks_1.act)(() => {
            result.current.onPressIn({});
        });
        expect(defaultParams.onHoldStart).not.toHaveBeenCalled();
        jest.advanceTimersByTime(pressEventDuration);
        expect(defaultParams.onHoldStart).toHaveBeenCalled();
    });
    test('Should call onHoldEnd on pressOut if user kept the touch more then specified threshold', () => {
        const pressEventDuration = 100;
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useTouchController_1.useTouchController)(Object.assign(Object.assign({}, defaultParams), { pressEventDuration })));
        (0, react_hooks_1.act)(() => {
            result.current.onPressIn({});
        });
        jest.advanceTimersByTime(pressEventDuration + 1);
        expect(defaultParams.onHoldEnd).not.toHaveBeenCalled();
        (0, react_hooks_1.act)(() => {
            result.current.onPressOut({});
        });
        expect(defaultParams.onHoldEnd).toHaveBeenCalled();
    });
    test('Should call onPress on pressOut if user kept the touch less then specified threshold', () => {
        const pressEventDuration = 100;
        const { result } = (0, react_hooks_1.renderHook)(() => (0, useTouchController_1.useTouchController)(Object.assign(Object.assign({}, defaultParams), { pressEventDuration })));
        (0, react_hooks_1.act)(() => {
            result.current.onPressIn({});
        });
        jest.advanceTimersByTime(pressEventDuration - 1);
        expect(defaultParams.onPress).not.toHaveBeenCalled();
        (0, react_hooks_1.act)(() => {
            result.current.onPressOut({});
        });
        expect(defaultParams.onPress).toHaveBeenCalled();
    });
});
