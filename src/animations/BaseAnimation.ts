import { Animated, ViewStyle } from 'react-native';

interface AnimationConfig {
  easing?: (value: number) => number;
  deceleration?: number;
  duration?: number;
  delay?: number;
  useNativeDriver?: boolean;
}

export interface ToasterAnimation {
  forward: () => Promise<Animated.EndResult>;
  backward: () => Promise<Animated.EndResult>;
  readonly styles: Animated.WithAnimatedObject<ViewStyle>;
}

export class BaseAnimation {
  config: AnimationConfig = {
    duration: 250,
    useNativeDriver: true,
  };

  from: number;

  to: number;

  value: Animated.Value;

  constructor(from: number, to: number, config?: AnimationConfig) {
    if (config) {
      this.config = config;
    }

    this.from = from;
    this.to = to;

    this.value = new Animated.Value(this.from);
  }

  forward = () => {
    return new Promise<Animated.EndResult>((resolve) => {
      Animated.timing(this.value, {
        toValue: this.to,
        ...this.config,
        useNativeDriver: this.config.useNativeDriver || true,
      }).start(resolve);
    });
  };

  backward = () => {
    return new Promise<Animated.EndResult>((resolve) => {
      Animated.timing(this.value, {
        toValue: this.from,
        ...this.config,
        useNativeDriver: this.config.useNativeDriver || true,
      }).start(resolve);
    });
  };
}
