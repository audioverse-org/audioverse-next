import pLimit from 'p-limit';
import pMemoize from 'p-memoize';
import pRetry from 'p-retry';
import pThrottle from 'p-throttle';
import pTimeout, { ClearablePromise } from 'p-timeout';

interface PromiseWrapperOptions {
	concurrencyLimit?: number;
	throttleLimit?: number;
	throttleIntervalMs?: number;
	timeoutMs?: number;
	retries?: number;
}

const DEFAULT_OPTIONS: Required<PromiseWrapperOptions> = {
	concurrencyLimit: 1,
	throttleLimit: 10,
	throttleIntervalMs: 1000,
	timeoutMs: 5000,
	retries: 3,
};

type ManagedAsyncFunction<T extends (...args: unknown[]) => Promise<unknown>> =
	(...args: Parameters<T>) => ClearablePromise<Awaited<ReturnType<T>>>;

export function manageAsyncFunction<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends (...args: any[]) => Promise<unknown>,
>(fn: T, options: PromiseWrapperOptions = {}): ManagedAsyncFunction<T> {
	const opts = { ...DEFAULT_OPTIONS, ...options };

	const throttle = pThrottle({
		limit: opts.throttleLimit,
		interval: opts.throttleIntervalMs,
	});
	const limit = pLimit(opts.concurrencyLimit);

	const throttledFn = throttle(fn);
	const limitedFn = (...args: Parameters<T>) =>
		limit(() => throttledFn(...args));
	const retriedFn = (...args: Parameters<T>) =>
		pRetry(() => limitedFn(...args), {
			retries: opts.retries,
		});
	const timedFn = (...args: Parameters<T>) =>
		pTimeout(retriedFn(...args), {
			milliseconds: opts.timeoutMs,
		});

	return pMemoize(timedFn) as ManagedAsyncFunction<T>;
}
