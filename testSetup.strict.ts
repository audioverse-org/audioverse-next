import './testSetup';

const errorSpy = jest.spyOn(global.console, 'error');
const warnSpy = jest.spyOn(global.console, 'warn');

afterAll(() => {
	const calls = [...errorSpy.mock.calls, ...warnSpy.mock.calls];

	if (calls.length > 0) {
		throw new Error(
			`${calls.length} console calls: ${calls
				.map((call) => call[0])
				.join('\n')}`
		);
	}
});
