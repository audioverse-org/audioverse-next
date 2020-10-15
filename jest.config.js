const common = {
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/src/__mocks__/fileMock.js',
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'@lib/(.*)': '<rootDir>/src/lib/$1',
		'@components/(.*)': '<rootDir>/src/components/$1',
		'@containers/(.*)': '<rootDir>/src/containers/$1',
		'@pages/(.*)': '<rootDir>/src/pages/$1',
	},
	transform: {
		'^.+\\.(t|j)sx?$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.test.json',
		},
	},
};

module.exports = {
	projects: [
		{
			displayName: 'test',
			...common,
		},
		{
			runner: 'jest-runner-eslint',
			displayName: 'lint',
			testMatch: ['<rootDir>/src/**/*'],
			...common,
		},
	],
};
