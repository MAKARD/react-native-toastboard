import * as React from 'react';

import { SlideY, ToasterAnimation } from '../../animations';
import { Timer } from '../../utils/Timer';
import { Queue } from '../../utils/Queue';
import { ToastType } from '../Toast';

export interface Item {
  type: ToastType;
  message: string;
  duration?: number;
}

export interface UseToasterParams {
  onHide?: (item: Item) => void;
  onShow?: (item: Item) => void;

  onPress?: (event: unknown, item: Item) => void;
  onHoldEnd?: (event: unknown, item: Item) => void;
  onHoldStart?: (event: unknown, item: Item) => void;

  animation?: ToasterAnimation;

  duration?: number;
  delayBetween?: number;

  middleware?: (item: Item) => string;

  hideOnPress?: boolean;
}

const unmountedHandler =  function (_message: string, _type: ToastType, _duration?: number) {
  /* eslint-disable-next-line no-console */
  console.warn('Toaster should be rendered before creating message');
};

let createToast = unmountedHandler;

const defaultAnimation = new SlideY(-57, 0);

export const useToaster = ({
  onHide,
  onShow,
  onPress: onPressProp,
  onHoldEnd: onHoldEndProp,
  onHoldStart: onHoldStartProp,
  animation = defaultAnimation,
  duration = 2000,
  delayBetween,
  middleware,
  hideOnPress,
}: UseToasterParams) => {
  const timer = React.useRef(new Timer());

  const [activeToastItem, setActiveToastItem] = React.useState<Item | undefined>();

  const queue = React.useMemo(() => {
    const onIteration = async (item: Item) => {
      setActiveToastItem(item);
      onShow?.(item);

      await animation.forward();
      await timer.current.start(item.duration || duration);
      await animation.backward();

      onHide?.(item);
      setActiveToastItem(undefined);

      if (delayBetween) {
        await Timer.wait(delayBetween);
      }
    };

    return new Queue<Item>({
      onIteration,
      // Queue shouldn't be changed
    });
  }, []);

  const onHoldStart = React.useCallback((event: unknown) => {
    onHoldStartProp?.(event, queue.list[0]);

    timer.current.pause();
  }, [onHoldStartProp]);

  const onHoldEnd = React.useCallback((event: unknown) => {
    onHoldEndProp?.(event, queue.list[0]);

    timer.current.resume();
  }, [onHoldEndProp]);

  const onPress = React.useCallback((event: unknown) => {
    onPressProp?.(event, queue.list[0]);

    if (!hideOnPress) {
      return;
    }

    timer.current.stop();
  }, [hideOnPress, onPressProp]);

  React.useEffect(() => {
    createToast =  (message: string, type: ToastType, toastDuration?: number) => {
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

type StaticMethod = (message: string, duration?: number) => void;

export interface StaticMethods {
  info: StaticMethod;
  error: StaticMethod;
  success: StaticMethod;
  debug: StaticMethod;
}

export const StaticMethods: StaticMethods = {
  info: function (message: string, duration?: number) {
    createToast(message, ToastType.INFO, duration);
  },
  error: function (message: string, duration?: number) {
    createToast(message, ToastType.ERROR, duration);
  },
  success: function (message: string, duration?: number) {
    createToast(message, ToastType.SUCCESS, duration);
  },
  debug: function (message: string, duration?: number) {
    createToast(message, ToastType.DEBUG, duration);
  },
};
