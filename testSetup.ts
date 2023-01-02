import { cleanup } from '@testing-library/react';
import matchers, {
	TestingLibraryMatchers,
} from '@testing-library/jest-dom/matchers';
import { vi, expect, afterEach, beforeAll, beforeEach } from 'vitest';

const m: TestingLibraryMatchers<string, void> = matchers;

expect.extend(m);

// TODO: Alphabetize these mock statements
vi.mock('@lib/api/fetchApi');
vi.mock('video.js');
vi.mock('@silvermine/videojs-airplay');
vi.mock('@silvermine/videojs-chromecast');
vi.mock('next/image');
vi.mock('next/legacy/image');
vi.mock('@lib/getIntlMessages');
vi.mock('next/router');
vi.mock('react-facebook-login/dist/facebook-login-render-props');
vi.mock('react-google-login');
vi.mock('@material-ui/core/Slider');
vi.mock('next/image');
vi.mock('next/script');
vi.mock('masonic');
vi.mock('next/dynamic');
vi.mock('next/head');

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
	cleanup();
});

// WORKAROUND: https://github.com/keppelen/react-facebook-login/issues/217#issuecomment-375652793
beforeAll(() => {
	const fbScript = document.createElement('script');
	fbScript.id = 'facebook-jssdk';

	document.body.appendChild(fbScript);
});

beforeEach(() => {
	// TODO: Do this in vitest.config.js instead
	vi.clearAllMocks();
});

module.exports = async () => {
	process.env.TZ = 'UTC';
};
