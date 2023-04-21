import type { Config } from '@jest/types';

import base from './jest.config';

const config: Config.InitialOptions = {
	...base,
	setupFilesAfterEnv: ['<rootDir>/testSetup.strict.ts'],
};

export default config;
