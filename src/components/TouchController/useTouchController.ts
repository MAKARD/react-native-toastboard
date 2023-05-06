import * as React from 'react';

export interface UseTouchControllerParams {
  pressEventDuration?: number;

  onPress: (event: unknown) => void;
  onHoldEnd: (event: unknown) => void;
  onHoldStart: (event: unknown) => void;
}

export const useTouchController = ({
  pressEventDuration = 200,
  onPress,
  onHoldEnd,
  onHoldStart,
}: UseTouchControllerParams) => {
  const [timestamp, setTimestamp] = React.useState(0);

  const timer = React.useRef<NodeJS.Timeout>();

  const onPressIn = React.useCallback((event: unknown) => {
    clearTimeout(timer.current);

    setTimestamp(Date.now());

    timer.current = setTimeout(() => onHoldStart(event), pressEventDuration);
  }, [onHoldStart, pressEventDuration]);

  const onPressOut = React.useCallback((event: unknown) => {
    const isPressEvent = (timestamp + pressEventDuration) >= Date.now();

    if (isPressEvent) {
      clearTimeout(timer.current);

      return onPress(event);
    }

    onHoldEnd(event);
  }, [timestamp, pressEventDuration, onPress, onHoldEnd]);

  return {
    onPressIn,
    onPressOut,
  };
};
