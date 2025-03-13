import pLimit from 'p-limit';
import pMemoize from 'p-memoize';
import pRetry from 'p-retry';
import pThrottle from 'p-throttle';
import pTimeout, { ClearablePromise } from 'p-timeout';

import { DISABLE_NETWORK_MEMOIZATION, LOG_NETWORK_REQUESTS } from './constants';
import { logToFile } from './logToFile';

interface PromiseWrapperOptions {
	concurrencyLimit?: number;
	throttleLimit?: number;
	throttleIntervalMs?: number;
	timeoutMs?: number;
	retries?: number;
	retryMinTimeoutMs?: number;
	retryMaxTimeoutMs?: number;
}

const DEFAULT_OPTIONS: Required<PromiseWrapperOptions> = {
	concurrencyLimit: 1,
	throttleLimit: 3,
	throttleIntervalMs: 1000,
	timeoutMs: 30000,
	retries: 3,
	retryMinTimeoutMs: 1000,
	retryMaxTimeoutMs: 10000,
};

const DURATION_WARNING_THRESHOLD = 5000;

type ManagedAsyncFunction<T extends (...args: unknown[]) => Promise<unknown>> =
	<R extends Awaited<ReturnType<T>>>(
		...args: Parameters<T>
	) => ClearablePromise<R>;

function getCallerFileName() {
	const err = new Error();
	const stackLines = err.stack?.split('\n');
	const callerStackLine = stackLines?.[3];

	const filePathPattern = /\((.*?:\d+:\d+)\)/;
	const match = callerStackLine?.match(filePathPattern);

	if (match && match.length > 1) {
		return match[1];
	}
	return 'Unknown';
}

const logFile = 'network.log';

const logger = {
	log: function (...args: unknown[]) {
		if (!LOG_NETWORK_REQUESTS) return;
		console.log(...args);
		logToFile(logFile, ...args);
	},
	dir: function (...args: unknown[]) {
		if (!LOG_NETWORK_REQUESTS) return;
		console.dir(...args);
		logToFile(logFile, args[0]);
	},
	warn: function (...args: unknown[]) {
		if (!LOG_NETWORK_REQUESTS) return;
		console.warn(...args);
		logToFile(logFile, ...args);
	},
	error: function (...args: unknown[]) {
		if (!LOG_NETWORK_REQUESTS) return;
		console.error(...args);
		logToFile(logFile, ...args);
	},
};

export function manageAsyncFunction<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends (...args: any[]) => Promise<unknown>,
>(fn: T, options: PromiseWrapperOptions = {}): ManagedAsyncFunction<T> {
	const opts = { ...DEFAULT_OPTIONS, ...options };
	const managedFunctionId = Math.random().toString(36).substring(2, 15);
	const source = getCallerFileName();

	const throttle = pThrottle({
		limit: opts.throttleLimit,
		interval: opts.throttleIntervalMs,
	});
	const limit = pLimit(opts.concurrencyLimit);

	const timedFn = (...args: Parameters<T>) =>
		pTimeout(fn(...args), {
			milliseconds: opts.timeoutMs,
			message: `Function timed out after ${opts.timeoutMs}ms. Args: ${JSON.stringify(args)}`,
		});
	const throttledFn = throttle(timedFn);
	const limitedFn = (...args: Parameters<T>) =>
		limit(() => throttledFn(...args));

	const retriedFn = async (...args: Parameters<T>) => {
		const requestId = Math.random().toString(36).substring(2, 15);
		const fullId = `${managedFunctionId}-${requestId}`;
		const startTime = performance.now();
		try {
			if (LOG_NETWORK_REQUESTS) {
				logger.dir(
					{ managedFunctionId, requestId, args, opts, source },
					{ depth: null },
				);
			}

			const result = await pRetry(() => limitedFn(...args), {
				retries: opts.retries,
				minTimeout: opts.retryMinTimeoutMs,
				maxTimeout: opts.retryMaxTimeoutMs,
				randomize: true,
				onFailedAttempt: (error) => {
					if (!LOG_NETWORK_REQUESTS) return;
					logger.log(
						`${fullId}: Attempt ${error.attemptNumber}/${opts.retries} failed`,
					);
				},
			});

			if (LOG_NETWORK_REQUESTS) {
				const endTime = performance.now();
				const duration = Math.round(endTime - startTime);
				logger.log(`${fullId} completed in ${duration}ms`);

				if (duration > DURATION_WARNING_THRESHOLD) {
					logger.warn(`WARNING: ${fullId} took ${duration}ms to complete`);
					logger.warn('This may result in timeouts in production');
				}
			}

			return result;
		} catch (e) {
			if (LOG_NETWORK_REQUESTS) {
				logger.error(`${fullId} failed`);
				logger.error(e);
			}
			throw e;
		}
	};

	if (DISABLE_NETWORK_MEMOIZATION) {
		return retriedFn as ManagedAsyncFunction<T>;
	}

	return pMemoize(retriedFn) as ManagedAsyncFunction<T>;
}
