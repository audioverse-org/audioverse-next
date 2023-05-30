import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

import { resetAllWhenMocks } from 'jest-when';

jest.mock('@silvermine/videojs-airplay');
jest.mock('@silvermine/videojs-chromecast');
jest.mock('next/image');
jest.mock('next/legacy/image');
jest.mock('video.js');

jest.mock('~lib/api/fetchApi');
jest.mock('~lib/getIntlMessages');
jest.mock('~lib/makeQueryClient');
jest.mock('~lib/swiper');

// WORKAROUND: https://github.com/keppelen/react-facebook-login/issues/217#issuecomment-375652793
beforeAll(() => {
	const fbScript = document.createElement('script');
	fbScript.id = 'facebook-jssdk';

	document.body.appendChild(fbScript);
});

beforeEach(() => {
	jest.clearAllMocks();
	resetAllWhenMocks();

	window.IntersectionObserver = jest.fn(
		() =>
		({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn(),
		} as any)
	);

	global.MutationObserver = jest.fn(
		() =>
		({
			observe: jest.fn(),
			disconnect: jest.fn(),
		} as any)
	);

	global.ResizeObserver = jest.fn(
		() =>
		({
			observe: jest.fn(),
			unobserve: jest.fn(),
			disconnect: jest.fn(),
		} as any)
	);
});
