import { renderHook, act } from '@testing-library/react-hooks';

import { StaticMethods, useToaster } from '../useToaster';
import { SlideX } from '../../../animations';

const defaultParams = {
  animation: new SlideX(0, 1, {
    duration: 0,
  }),
};

describe('useToaster', () => {
  jest.useFakeTimers();

  test('Should warn in console if Toaster is not instantiated', () => {
    jest.spyOn(console, 'warn').mockImplementationOnce(() => {});

    StaticMethods.debug('test');

    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledWith('Toaster should be rendered before creating message');
  });

  test('Should set activeToastItem via static methods', async () => {
    const duration = 100;

    const { result } = renderHook(() => useToaster(defaultParams));

    act(() => {
      StaticMethods.debug('debug', duration);
    });

    expect(result.current.activeToastItem).toStrictEqual({
      type: 'DEBUG',
      message: 'debug',
      duration,
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(duration);
    });

    expect(result.current.activeToastItem).toBe(undefined);

    act(() => {
      StaticMethods.error('error', duration);
    });

    expect(result.current.activeToastItem).toStrictEqual({
      type: 'ERROR',
      message: 'error',
      duration,
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(duration);
    });

    expect(result.current.activeToastItem).toBe(undefined);

    act(() => {
      StaticMethods.info('info', duration);
    });

    expect(result.current.activeToastItem).toStrictEqual({
      type: 'INFO',
      message: 'info',
      duration,
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(duration);
    });

    expect(result.current.activeToastItem).toBe(undefined);

    act(() => {
      StaticMethods.success('success', duration);
    });

    expect(result.current.activeToastItem).toStrictEqual({
      type: 'SUCCESS',
      message: 'success',
      duration,
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(duration);
    });

    expect(result.current.activeToastItem).toBe(undefined);
  });

  test('Should close toast on press if hideOnPress is true', async () => {
    const { result } = renderHook(() => useToaster({
      ...defaultParams,
      hideOnPress: true,
    }));

    act(() => {
      StaticMethods.debug('debug', 100);
    });

    expect(result.current.activeToastItem).toBeDefined();

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
      result.current.onPress({});
    });

    expect(result.current.activeToastItem).toBe(undefined);
  });

  test('Should not close toast on press if hideOnPress is false', async () => {
    const { result } = renderHook(() => useToaster({
      ...defaultParams,
      hideOnPress: false,
    }));

    act(() => {
      StaticMethods.debug('debug', 100);
    });

    expect(result.current.activeToastItem).toBeDefined();

    await act(async () => {
      await jest.advanceTimersByTimeAsync(0);
      result.current.onPress({});
    });

    expect(result.current.activeToastItem).toBeDefined();
  });

  test('Should call onPress on press', () => {
    const onPress = jest.fn();

    const { result } = renderHook(() => useToaster({
      ...defaultParams,
      onPress,
      hideOnPress: false,
    }));

    act(() => {
      StaticMethods.debug('debug', 100);
    });

    act(() => {
      result.current.onPress({});
    });

    expect(onPress).toHaveBeenCalledWith({}, {
      duration: 100,
      message: 'debug',
      type: 'DEBUG',
    });
  });

  test('Should pause toast on press until user removes touch', async () => {
    const { result } = renderHook(() => useToaster(defaultParams));
    const duration = 100;

    act(() => {
      StaticMethods.debug('debug', duration);
    });

    const timeLeft = duration / 2;

    await act(async () => {
      await jest.advanceTimersByTimeAsync(timeLeft);
    });

    act(() => {
      result.current.onHoldStart({});
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(duration + 1);
    });

    expect(result.current.activeToastItem).toBeDefined();

    act(() => {
      result.current.onHoldEnd({});
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(timeLeft - 1);
    });

    expect(result.current.activeToastItem).toBeDefined();

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1);
    });

    expect(result.current.activeToastItem).toBe(undefined);
  });

  test('Should call onHoldStart on holdStart', () => {
    const onHoldStart = jest.fn();

    const { result } = renderHook(() => useToaster({
      ...defaultParams,
      onHoldStart,
    }));

    act(() => {
      StaticMethods.debug('debug', 100);
      result.current.onHoldStart({});
    });

    expect(onHoldStart).toHaveBeenCalledWith({}, {
      duration: 100,
      message: 'debug',
      type: 'DEBUG',
    });
  });

  test('Should call onHoldEnd on holdEnd', () => {
    const onHoldEnd = jest.fn();

    const { result } = renderHook(() => useToaster({
      ...defaultParams,
      onHoldEnd,
    }));

    act(() => {
      StaticMethods.debug('debug', 100);
      result.current.onHoldEnd({});
    });

    expect(onHoldEnd).toHaveBeenCalledWith({}, {
      duration: 100,
      message: 'debug',
      type: 'DEBUG',
    });
  });

  test('Should call onShow when toast is shown',  () => {
    const onShow = jest.fn();

    renderHook(() => useToaster({
      ...defaultParams,
      onShow,
    }));

    expect(onShow).not.toHaveBeenCalled();

    act(() => {
      StaticMethods.debug('debug', 100);
    });

    expect(onShow).toHaveBeenCalledWith({
      duration: 100,
      message: 'debug',
      type: 'DEBUG',
    });
  });

  test('Should call onHide before toast gets hidden', async () => {
    const onHide = jest.fn();

    renderHook(() => useToaster({
      ...defaultParams,
      onHide,
    }));

    expect(onHide).not.toHaveBeenCalled();

    act(() => {
      StaticMethods.debug('debug', 100);
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(100);
    });

    expect(onHide).toHaveBeenCalledWith({
      duration: 100,
      message: 'debug',
      type: 'DEBUG',
    });
  });

  test('Should make delay between toast if delayBetween is specified', async () => {
    const delayBetween = 66;
    const duration = 50;

    const { result } = renderHook(() => useToaster({
      ...defaultParams,
      delayBetween,
    }));

    act(() => {
      StaticMethods.debug('debug', duration);
      StaticMethods.info('info', duration);
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(duration - 1);
    });

    expect(result.current.activeToastItem).toStrictEqual({
      duration,
      message: 'debug',
      type: 'DEBUG',
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1);
    });

    expect(result.current.activeToastItem).toBe(undefined);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(delayBetween);
    });

    expect(result.current.activeToastItem).toStrictEqual({
      duration,
      message: 'info',
      type: 'INFO',
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(duration);
    });

    expect(result.current.activeToastItem).toBe(undefined);
  });

  it('Should apply middleware to message', () => {
    const { result } = renderHook(() => useToaster({
      ...defaultParams,
      middleware: (item) => {
        return JSON.stringify(item);
      },
    }));

    act(() => {
      StaticMethods.debug('debug', 100);
    });

    expect(result.current.activeToastItem?.message).toBe(JSON.stringify({
      message: 'debug',
      type: 'DEBUG',
      duration: 100,
    }));
  });
});
