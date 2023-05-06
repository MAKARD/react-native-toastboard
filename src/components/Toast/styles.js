"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styles = void 0;
const react_native_1 = require("react-native");
const ToastTypes_1 = require("./ToastTypes");
exports.styles = {
    [ToastTypes_1.ToastType.INFO]: react_native_1.StyleSheet.create({
        container: {
            backgroundColor: 'blue',
            padding: 20,
        },
        message: {
            color: '#fff',
            textAlign: 'center',
        },
    }),
    [ToastTypes_1.ToastType.ERROR]: react_native_1.StyleSheet.create({
        container: {
            backgroundColor: 'red',
            padding: 20,
        },
        message: {
            color: '#fff',
            textAlign: 'center',
        },
    }),
    [ToastTypes_1.ToastType.SUCCESS]: react_native_1.StyleSheet.create({
        container: {
            backgroundColor: 'green',
            padding: 20,
        },
        message: {
            color: '#fff',
            textAlign: 'center',
        },
    }),
    [ToastTypes_1.ToastType.DEBUG]: react_native_1.StyleSheet.create({
        container: {
            backgroundColor: 'yellow',
            padding: 20,
        },
        message: {
            color: 'black',
            textAlign: 'center',
        },
    }),
};
