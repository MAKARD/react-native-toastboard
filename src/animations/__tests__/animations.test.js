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
const react_native_1 = require("react-native");
const index_1 = require("../index");
jest.mock('react-native', () => ({
    Animated: {
        Value: () => { },
        timing: jest.fn().mockReturnValue({
            start: jest.fn().mockImplementation((resolve) => resolve()),
        }),
    },
}));
describe('animations', () => {
    const opacity = new index_1.Opacity(0, 1, { duration: 1 });
    const slideX = new index_1.SlideX(2, 3, { duration: 2 });
    const slideY = new index_1.SlideY(4, 5, { duration: 3 });
    const zoom = new index_1.Zoom(6, 7, { duration: 4 });
    test('Should set initial values', () => {
        expect(opacity.config.duration).toBe(1);
        expect(opacity.from).toBe(0);
        expect(opacity.to).toBe(1);
        expect(slideX.config.duration).toBe(2);
        expect(slideX.from).toBe(2);
        expect(slideX.to).toBe(3);
        expect(slideY.config.duration).toBe(3);
        expect(slideY.from).toBe(4);
        expect(slideY.to).toBe(5);
        expect(zoom.config.duration).toBe(4);
        expect(zoom.from).toBe(6);
        expect(zoom.to).toBe(7);
    });
    test('Should run timing animation on backward', () => __awaiter(void 0, void 0, void 0, function* () {
        yield opacity.backward();
        expect(react_native_1.Animated.timing).toHaveBeenCalledWith({}, {
            duration: 1,
            toValue: 0,
            useNativeDriver: true,
        });
        react_native_1.Animated.timing.mockClear();
        yield opacity.forward();
        expect(react_native_1.Animated.timing).toHaveBeenCalledWith({}, {
            duration: 1,
            toValue: 1,
            useNativeDriver: true,
        });
        react_native_1.Animated.timing.mockClear();
        yield slideX.backward();
        expect(react_native_1.Animated.timing).toHaveBeenCalledWith({}, {
            duration: 2,
            toValue: 2,
            useNativeDriver: true,
        });
        react_native_1.Animated.timing.mockClear();
        yield slideX.forward();
        expect(react_native_1.Animated.timing).toHaveBeenCalledWith({}, {
            duration: 2,
            toValue: 3,
            useNativeDriver: true,
        });
        react_native_1.Animated.timing.mockClear();
        yield slideY.backward();
        expect(react_native_1.Animated.timing).toHaveBeenCalledWith({}, {
            duration: 3,
            toValue: 4,
            useNativeDriver: true,
        });
        react_native_1.Animated.timing.mockClear();
        yield slideY.forward();
        expect(react_native_1.Animated.timing).toHaveBeenCalledWith({}, {
            duration: 3,
            toValue: 5,
            useNativeDriver: true,
        });
        react_native_1.Animated.timing.mockClear();
        yield zoom.backward();
        expect(react_native_1.Animated.timing).toHaveBeenCalledWith({}, {
            duration: 4,
            toValue: 6,
            useNativeDriver: true,
        });
        react_native_1.Animated.timing.mockClear();
        yield zoom.forward();
        expect(react_native_1.Animated.timing).toHaveBeenCalledWith({}, {
            duration: 4,
            toValue: 7,
            useNativeDriver: true,
        });
        react_native_1.Animated.timing.mockClear();
    }));
    test('Should return promise on backward/forward', () => {
        expect(opacity.backward()).toBeInstanceOf(Promise);
        expect(opacity.forward()).toBeInstanceOf(Promise);
        expect(slideX.backward()).toBeInstanceOf(Promise);
        expect(slideX.forward()).toBeInstanceOf(Promise);
        expect(slideY.backward()).toBeInstanceOf(Promise);
        expect(slideY.forward()).toBeInstanceOf(Promise);
        expect(zoom.backward()).toBeInstanceOf(Promise);
        expect(zoom.forward()).toBeInstanceOf(Promise);
    });
    test('Should return specific object according to animation type', () => {
        expect(opacity.styles).toMatchObject({
            opacity: {},
        });
        expect(slideX.styles).toMatchObject({
            transform: [{ translateX: {} }],
        });
        expect(slideY.styles).toMatchObject({
            transform: [{ translateY: {} }],
        });
        expect(zoom.styles).toMatchObject({
            transform: [{ scale: {} }],
        });
    });
});
