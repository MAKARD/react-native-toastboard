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
exports.StaticMethods = exports.useToaster = void 0;
const React = __importStar(require("react"));
const animations_1 = require("../../animations");
const Timer_1 = require("../../utils/Timer");
const Queue_1 = require("../../utils/Queue");
const Toast_1 = require("../Toast");
const unmountedHandler = function (_message, _type, _duration) {
    /* eslint-disable-next-line no-console */
    console.warn('Toaster should be rendered before creating message');
};
let createToast = unmountedHandler;
const defaultAnimation = new animations_1.SlideY(-57, 0);
const useToaster = ({ onHide, onShow, onPress: onPressProp, onHoldEnd: onHoldEndProp, onHoldStart: onHoldStartProp, animation = defaultAnimation, duration = 2000, delayBetween, middleware, hideOnPress, }) => {
    const timer = React.useRef(new Timer_1.Timer());
    const [activeToastItem, setActiveToastItem] = React.useState();
    const queue = React.useMemo(() => {
        const onIteration = (item) => __awaiter(void 0, void 0, void 0, function* () {
            setActiveToastItem(item);
            onShow === null || onShow === void 0 ? void 0 : onShow(item);
            yield animation.forward();
            yield timer.current.start(item.duration || duration);
            yield animation.backward();
            onHide === null || onHide === void 0 ? void 0 : onHide(item);
            setActiveToastItem(undefined);
            if (delayBetween) {
                yield Timer_1.Timer.wait(delayBetween);
            }
        });
        return new Queue_1.Queue({
            onIteration,
            // Queue shouldn't be changed
        });
    }, []);
    const onHoldStart = React.useCallback((event) => {
        onHoldStartProp === null || onHoldStartProp === void 0 ? void 0 : onHoldStartProp(event, queue.list[0]);
        timer.current.pause();
    }, [onHoldStartProp]);
    const onHoldEnd = React.useCallback((event) => {
        onHoldEndProp === null || onHoldEndProp === void 0 ? void 0 : onHoldEndProp(event, queue.list[0]);
        timer.current.resume();
    }, [onHoldEndProp]);
    const onPress = React.useCallback((event) => {
        onPressProp === null || onPressProp === void 0 ? void 0 : onPressProp(event, queue.list[0]);
        if (!hideOnPress) {
            return;
        }
        timer.current.stop();
    }, [hideOnPress, onPressProp]);
    React.useEffect(() => {
        createToast = (message, type, toastDuration) => {
            const transformed = middleware
                ? middleware({ message, type, duration: toastDuration })
                : message;
            queue.push({ message: transformed, type, duration: toastDuration });
            queue.start();
        };
        return () => {
            createToast = unmountedHandler;
            queue.stop();
            timer.current.stop();
        };
    }, []);
    return {
        activeToastItem,
        onHoldStart,
        onHoldEnd,
        onPress,
    };
};
exports.useToaster = useToaster;
exports.StaticMethods = {
    info: function (message, duration) {
        createToast(message, Toast_1.ToastType.INFO, duration);
    },
    error: function (message, duration) {
        createToast(message, Toast_1.ToastType.ERROR, duration);
    },
    success: function (message, duration) {
        createToast(message, Toast_1.ToastType.SUCCESS, duration);
    },
    debug: function (message, duration) {
        createToast(message, Toast_1.ToastType.DEBUG, duration);
    },
};
