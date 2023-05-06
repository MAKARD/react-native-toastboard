import { Queue } from '../Queue';

describe('Queue', () => {
  test('Should set process callbacks', () => {
    const handleIteration = jest.fn();

    const queue = new Queue({
      onIteration: handleIteration,
    });

    expect(queue.onIteration).toEqual(handleIteration);
  });

  test('Should add item to list', () => {
    const queue = new Queue();

    queue.push('test');

    expect(queue.list[0]).toBe('test');
  });

  test('Should start process if it not active', () => {
    const queue = new Queue();
    const spy = jest.spyOn(queue, 'process');

    queue.push('test');
    queue.start();

    expect(spy).toHaveBeenCalledTimes(2);

    queue.active = true;
    queue.start();

    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('Should stop process', () => {
    const queue = new Queue();
    const spy = jest.spyOn(queue, 'process');

    queue.start();
    expect(spy).toHaveBeenCalledTimes(1);

    queue.push('test');
    queue.stop();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Should execute process callbacks on process', async () => {
    const onIteration = jest.fn();

    const queue = new Queue({
      onIteration,
    });

    queue.push('test');
    await queue.start();

    expect(onIteration).toHaveBeenCalledWith('test');
  });
});
