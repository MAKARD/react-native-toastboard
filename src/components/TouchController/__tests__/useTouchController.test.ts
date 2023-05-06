import { act, renderHook } from '@testing-library/react-hooks';

import { useTouchController } from '../useTouchController';

const defaultParams = {
  onPress: jest.fn(),
  onHoldEnd: jest.fn(),
  onHoldStart: jest.fn(),
};

describe('useTouchController', () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should call onHoldStart on pressIn after specified threshold', () => {
    const pressEventDuration = 100;
    const { result } = renderHook(() => useTouchController({
      ...defaultParams,
      pressEventDuration,
    }));

    act(() => {
      result.current.onPressIn({});
    });

    expect(defaultParams.onHoldStart).not.toHaveBeenCalled();

    jest.advanceTimersByTime(pressEventDuration);

    expect(defaultParams.onHoldStart).toHaveBeenCalled();
  });

  test('Should call onHoldEnd on pressOut if user kept the touch more then specified threshold', () => {
    const pressEventDuration = 100;
    const { result } = renderHook(() => useTouchController({
      ...defaultParams,
      pressEventDuration,
    }));

    act(() => {
      result.current.onPressIn({});
    });

    jest.advanceTimersByTime(pressEventDuration + 1);

    expect(defaultParams.onHoldEnd).not.toHaveBeenCalled();

    act(() => {
      result.current.onPressOut({});
    });

    expect(defaultParams.onHoldEnd).toHaveBeenCalled();
  });

  test('Should call onPress on pressOut if user kept the touch less then specified threshold', () => {
    const pressEventDuration = 100;
    const { result } = renderHook(() => useTouchController({
      ...defaultParams,
      pressEventDuration,
    }));

    act(() => {
      result.current.onPressIn({});
    });

    jest.advanceTimersByTime(pressEventDuration - 1);

    expect(defaultParams.onPress).not.toHaveBeenCalled();

    act(() => {
      result.current.onPressOut({});
    });

    expect(defaultParams.onPress).toHaveBeenCalled();
  });
});
