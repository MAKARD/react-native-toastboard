"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toaster = void 0;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const Toast_1 = require("../Toast");
const TouchController_1 = require("../TouchController");
const useToaster_1 = require("./useToaster");
const styles_1 = require("./styles");
const Toaster = (_a) => {
    var _b;
    var { containerViewProps, children } = _a, props = __rest(_a, ["containerViewProps", "children"]);
    const { onHoldStart, onHoldEnd, onPress, activeToastItem, } = (0, useToaster_1.useToaster)(props);
    return (<react_native_1.Animated.View {...containerViewProps} style={[styles_1.styles.container, containerViewProps.style, (_b = props.animation) === null || _b === void 0 ? void 0 : _b.styles]}>
      <TouchController_1.TouchController onHoldStart={onHoldStart} onHoldEnd={onHoldEnd} onPress={onPress}>
        {activeToastItem && ((children === null || children === void 0 ? void 0 : children(activeToastItem)) || (<Toast_1.Toast type={activeToastItem.type} message={activeToastItem.message}/>))}
      </TouchController_1.TouchController>
    </react_native_1.Animated.View>);
};
exports.Toaster = Toaster;
exports.Toaster.info = useToaster_1.StaticMethods.info;
exports.Toaster.error = useToaster_1.StaticMethods.error;
exports.Toaster.debug = useToaster_1.StaticMethods.debug;
exports.Toaster.success = useToaster_1.StaticMethods.success;
