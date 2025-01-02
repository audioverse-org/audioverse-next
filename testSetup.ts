import '@testing-library/jest-dom';
import 'jest-canvas-mock';

import { resetAllWhenMocks } from 'jest-when';

import getIntlMessages from '~src/lib/getIntlMessages';

jest.mock('@silvermine/videojs-airplay');
jest.mock('@silvermine/videojs-chromecast');
jest.mock('next/image');
jest.mock('next/legacy/image');
jest.mock('video.js');

jest.mock('next/navigation', () => ({
	useSearchParams: jest.fn(() => new URL('http://example.com').searchParams),
}));

jest.mock('@segment/analytics-next', () => {
	const originalModule = jest.requireActual('@segment/analytics-next');

	return {
		__esModule: true,
		...originalModule,
		AnalyticsBrowser: {
			load: () => {
				return {
					track: jest.fn(),
					page: jest.fn(),
					reset: jest.fn(),
					identify: jest.fn(),
				};
			},
		},
	};
});

jest.mock('~lib/api/fetchApi');
jest.mock('~lib/getIntlMessages');
jest.mock('~lib/makeQueryClient');
jest.mock('~lib/swiper');

interface CustomMatchers<R = unknown> {
	toAppearBefore: (argument: HTMLElement) => R;
}

declare global {
	/* eslint-disable */
	// https://jestjs.io/docs/26.x/expect#expectextendmatchers
	namespace jest {
		interface Expect extends CustomMatchers {}
		interface Matchers<R> extends CustomMatchers<R> {}
		interface InverseAsymmetricMatchers extends CustomMatchers {}
	}
	/* eslint-enable */
}

expect.extend({
	toAppearBefore(received: HTMLElement, argument: HTMLElement) {
		const pass = !!(
			received.compareDocumentPosition(argument) &
			Node.DOCUMENT_POSITION_FOLLOWING
		);

		return {
			message: () =>
				pass
					? `expected ${received} not to be before ${argument}`
					: `expected ${received} to be before ${argument}`,
			pass,
		};
	},
});

// WORKAROUND: https://github.com/keppelen/react-facebook-login/issues/217#issuecomment-375652793
beforeAll(() => {
	const fbScript = document.createElement('script');
	fbScript.id = 'facebook-jssdk';

	document.body.appendChild(fbScript);
});

beforeEach(() => {
	jest.clearAllMocks();
	resetAllWhenMocks();

	jest.mocked(getIntlMessages).mockResolvedValue({});

	window.IntersectionObserver = jest.fn(
		() =>
			({
				observe: jest.fn(),
				unobserve: jest.fn(),
				disconnect: jest.fn(),
			}) as any,
	);

	global.MutationObserver = jest.fn(
		() =>
			({
				observe: jest.fn(),
				disconnect: jest.fn(),
			}) as any,
	);

	global.ResizeObserver = jest.fn(
		() =>
			({
				observe: jest.fn(),
				unobserve: jest.fn(),
				disconnect: jest.fn(),
			}) as any,
	);
});
