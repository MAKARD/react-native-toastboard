import { Timer } from '../Timer';

describe('Timer', () => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
  jest.spyOn(global, 'clearTimeout');

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test('Should resolve promise immediately if delay less than 0', () => {
    const timer = new Timer();

    timer.start(0);
    expect(setTimeout).not.toHaveBeenCalled();

    timer.start(-1);
    expect(setTimeout).not.toHaveBeenCalled();
  });

  test('Should resolve promise after specified delay', () => {
    const timer = new Timer();

    timer.start(100);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
  });

  test('Should resolve promise immediately after stop', () => {
    const timer = new Timer();

    timer.start(100);
    timer.stop();

    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  test('Should do nothing if timer is not active', () => {
    const timer = new Timer();

    timer.stop();
    timer.pause();
    timer.resume();

    expect(clearTimeout).not.toHaveBeenCalled();
    expect(setTimeout).not.toHaveBeenCalled();
  });

  test('Should clear handlers after stop', () => {
    const timer = new Timer();

    timer.start(100);
    timer.stop();

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);

    timer.pause();
    timer.resume();

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test('Should pause timer', () => {
    const timer = new Timer();

    timer.start(100);
    timer.pause();

    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  test('Should resume timer', () => {
    const timer = new Timer();

    timer.start(100);
    timer.pause();

    expect(clearTimeout).toHaveBeenCalledTimes(1);

    timer.resume();

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
  });

  test('Should resolve promise after 2000 sec delay', () => {
    Timer.wait();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });

  test('Should resolve promise after specified delay', () => {
    Timer.wait(100);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
  });
});
