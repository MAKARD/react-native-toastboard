import * as React from 'react';
import { View, Text } from 'react-native';

import { ToastType } from './ToastTypes';
import { styles } from './styles';

interface ToastProps {
  message: string;
  type: ToastType;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
}) => (
  <View style={styles[type].container}>
    <Text style={styles[type].message}>
      {message}
    </Text>
  </View>
);
