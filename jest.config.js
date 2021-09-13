const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

module.exports = {
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/src/__mocks__/fileMock.js',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		...moduleNameMapper,
	},
	transform: {
		'^.+\\.(t|j)sx?$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.test.json',
		},
	},
	setupFiles: ['jest-date-mock'],
	setupFilesAfterEnv: ['<rootDir>/testSetup.ts'],
};
