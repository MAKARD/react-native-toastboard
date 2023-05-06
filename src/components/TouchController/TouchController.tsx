import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { UseTouchControllerParams, useTouchController } from './useTouchController';

export const TouchController: React.FC<React.PropsWithChildren<UseTouchControllerParams>> = ({
  children,
  ...props
}) => {
  const {
    onPressIn,
    onPressOut,
  } = useTouchController(props);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {children}
    </TouchableOpacity>
  );
};
