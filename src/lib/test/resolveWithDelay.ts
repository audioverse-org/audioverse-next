import { sleep } from '@lib/sleep';
import { when } from 'jest-when';

type IResolveWithDelayOptions = {
	ms?: number;
	value?: unknown;
	resolve?: boolean;
};

export function resolveWithDelay(
	mock: jest.SpyInstance,
	{ ms = 50, value, resolve = true } = {} as IResolveWithDelayOptions
): void {
	// WORKAROUND: https://github.com/timkindberg/jest-when/issues/59#issuecomment-922558860
	when(mock).mockImplementation(() => sleep({ ms, value, resolve }));
}
