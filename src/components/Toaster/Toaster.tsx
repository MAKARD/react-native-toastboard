import * as React from 'react';
import { Animated, ViewProps } from 'react-native';

import { Toast } from '../Toast';
import { TouchController } from '../TouchController';

import { Item, UseToasterParams, StaticMethods, useToaster } from './useToaster';
import { styles } from './styles';

interface ToasterProps extends UseToasterParams {
  containerViewProps?: ViewProps;
  children?: (item: Item) => React.ReactNode;
}

export const Toaster: React.FC<ToasterProps> & StaticMethods = ({
  containerViewProps,
  children,
  ...props
}) => {
  const {
    onHoldStart,
    onHoldEnd,
    onPress,
    activeToastItem,
  } = useToaster(props);

  return (
    <Animated.View
      {...containerViewProps}
      style={[styles.container, containerViewProps?.style, props.animation?.styles]}
    >
      <TouchController
        onHoldStart={onHoldStart}
        onHoldEnd={onHoldEnd}
        onPress={onPress}
      >
        {activeToastItem && (children?.(activeToastItem) || (
          <Toast
            type={activeToastItem.type}
            message={activeToastItem.message}
          />
        ))}
      </TouchController>
    </Animated.View>
  );
};

Toaster.info = StaticMethods.info;
Toaster.error = StaticMethods.error;
Toaster.debug = StaticMethods.debug;
Toaster.success = StaticMethods.success;
