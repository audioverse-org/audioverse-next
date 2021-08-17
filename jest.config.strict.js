const config = require('./jest.config');

module.exports = {
	...config,
	setupFilesAfterEnv: ['<rootDir>/testSetup.strict.ts'],
};
