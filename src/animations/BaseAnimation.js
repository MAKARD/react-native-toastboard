"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAnimation = void 0;
const react_native_1 = require("react-native");
class BaseAnimation {
    constructor(from, to, config) {
        this.config = {
            duration: 250,
            useNativeDriver: true,
        };
        this.forward = () => {
            return new Promise((resolve) => {
                react_native_1.Animated.timing(this.value, Object.assign(Object.assign({ toValue: this.to }, this.config), { useNativeDriver: this.config.useNativeDriver || true })).start(resolve);
            });
        };
        this.backward = () => {
            return new Promise((resolve) => {
                react_native_1.Animated.timing(this.value, Object.assign(Object.assign({ toValue: this.from }, this.config), { useNativeDriver: this.config.useNativeDriver || true })).start(resolve);
            });
        };
        if (config) {
            this.config = config;
        }
        this.from = from;
        this.to = to;
        this.value = new react_native_1.Animated.Value(this.from);
    }
}
exports.BaseAnimation = BaseAnimation;
