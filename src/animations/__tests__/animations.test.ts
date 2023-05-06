import { Animated } from 'react-native';

import { Opacity, SlideX, SlideY, Zoom } from '../index';

jest.mock('react-native', () => ({
  Animated: {
    Value: () => { },
    timing: jest.fn().mockReturnValue({
      start: jest.fn().mockImplementation((resolve) => resolve()),
    }),
  },
}));

describe('animations', () => {
  const opacity = new Opacity(0, 1, { duration: 1 });
  const slideX = new SlideX(2, 3, { duration: 2 });
  const slideY = new SlideY(4, 5, { duration: 3 });
  const zoom = new Zoom(6, 7, { duration: 4 });

  test('Should set initial values', () => {
    expect(opacity.config.duration).toBe(1);
    expect(opacity.from).toBe(0);
    expect(opacity.to).toBe(1);

    expect(slideX.config.duration).toBe(2);
    expect(slideX.from).toBe(2);
    expect(slideX.to).toBe(3);

    expect(slideY.config.duration).toBe(3);
    expect(slideY.from).toBe(4);
    expect(slideY.to).toBe(5);

    expect(zoom.config.duration).toBe(4);
    expect(zoom.from).toBe(6);
    expect(zoom.to).toBe(7);
  });

  test('Should run timing animation on backward', async () => {
    await opacity.backward();
    expect(Animated.timing).toHaveBeenCalledWith({}, {
      duration: 1,
      toValue: 0,
      useNativeDriver: true,
    });
    (Animated.timing as jest.Mock).mockClear();

    await opacity.forward();
    expect(Animated.timing).toHaveBeenCalledWith({}, {
      duration: 1,
      toValue: 1,
      useNativeDriver: true,
    });
    (Animated.timing as jest.Mock).mockClear();

    await slideX.backward();
    expect(Animated.timing).toHaveBeenCalledWith({}, {
      duration: 2,
      toValue: 2,
      useNativeDriver: true,
    });
    (Animated.timing as jest.Mock).mockClear();

    await slideX.forward();
    expect(Animated.timing).toHaveBeenCalledWith({}, {
      duration: 2,
      toValue: 3,
      useNativeDriver: true,
    });
    (Animated.timing as jest.Mock).mockClear();

    await slideY.backward();
    expect(Animated.timing).toHaveBeenCalledWith({}, {
      duration: 3,
      toValue: 4,
      useNativeDriver: true,
    });
    (Animated.timing as jest.Mock).mockClear();

    await slideY.forward();
    expect(Animated.timing).toHaveBeenCalledWith({}, {
      duration: 3,
      toValue: 5,
      useNativeDriver: true,
    });
    (Animated.timing as jest.Mock).mockClear();

    await zoom.backward();
    expect(Animated.timing).toHaveBeenCalledWith({}, {
      duration: 4,
      toValue: 6,
      useNativeDriver: true,
    });
    (Animated.timing as jest.Mock).mockClear();

    await zoom.forward();
    expect(Animated.timing).toHaveBeenCalledWith({}, {
      duration: 4,
      toValue: 7,
      useNativeDriver: true,
    });
    (Animated.timing as jest.Mock).mockClear();
  });

  test('Should return promise on backward/forward', () => {
    expect(opacity.backward()).toBeInstanceOf(Promise);
    expect(opacity.forward()).toBeInstanceOf(Promise);

    expect(slideX.backward()).toBeInstanceOf(Promise);
    expect(slideX.forward()).toBeInstanceOf(Promise);

    expect(slideY.backward()).toBeInstanceOf(Promise);
    expect(slideY.forward()).toBeInstanceOf(Promise);

    expect(zoom.backward()).toBeInstanceOf(Promise);
    expect(zoom.forward()).toBeInstanceOf(Promise);
  });

  test('Should return specific object according to animation type', () => {
    expect(opacity.styles).toMatchObject({
      opacity: {},
    });

    expect(slideX.styles).toMatchObject({
      transform: [{ translateX: {} }],
    });

    expect(slideY.styles).toMatchObject({
      transform: [{ translateY: {} }],
    });

    expect(zoom.styles).toMatchObject({
      transform: [{ scale: {} }],
    });
  });
});
