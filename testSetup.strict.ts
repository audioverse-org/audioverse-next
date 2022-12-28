import './testSetup';

const errorSpy = jest.spyOn(global.console, 'error');
const warnSpy = jest.spyOn(global.console, 'warn');

afterEach(() => {
	expect(errorSpy).not.toHaveBeenCalled();
	expect(warnSpy).not.toHaveBeenCalled();
	errorSpy.mockClear();
	warnSpy.mockClear();
});
