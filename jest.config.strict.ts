import base from './jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	...base,
	setupFilesAfterEnv: ['<rootDir>/testSetup.strict.ts'],
};

export default config;
