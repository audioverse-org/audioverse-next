import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';

const errorSpy = jest.spyOn(global.console, 'error');
const warnSpy = jest.spyOn(global.console, 'warn');

afterAll(() => {
	expect(errorSpy).not.toHaveBeenCalled();
	expect(warnSpy).not.toHaveBeenCalled();
});
