import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import { resetAllWhenMocks } from 'jest-when';
import { loadRouter } from '@lib/test/helpers';

jest.mock('@lib/api/fetchApi');
jest.mock('video.js');

window.Beacon = jest.fn();

// WORKAROUND: https://github.com/keppelen/react-facebook-login/issues/217#issuecomment-375652793
beforeAll(() => {
	const fbScript = document.createElement('script');
	fbScript.id = 'facebook-jssdk';

	document.body.appendChild(fbScript);
});

beforeEach(() => {
	jest.resetAllMocks();
	resetAllWhenMocks();
	loadRouter({
		query: {
			language: 'en',
		},
	});
});
