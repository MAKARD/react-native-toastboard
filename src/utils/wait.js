// @flow
/* eslint-disable-next-line no-magic-numbers */
export function wait( msec: number = 2000): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, msec));
}
