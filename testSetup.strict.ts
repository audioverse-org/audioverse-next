import './testSetup';
import { afterEach, expect, vi } from 'vitest';

const errorActual = global.console.error;
const warnActual = global.console.warn;
const errorSpy = vi.spyOn(global.console, 'error');
const warnSpy = vi.spyOn(global.console, 'warn');

errorSpy.mockImplementation((...args: unknown[]) => {
	errorActual(...args);
	console.log(Error('Unexpected console.error').stack);
});

warnSpy.mockImplementation((...args: unknown[]) => {
	warnActual(...args);
	console.log(Error('Unexpected console.warn').stack);
});

afterEach(() => {
	expect(errorSpy).not.toHaveBeenCalled();
	expect(warnSpy).not.toHaveBeenCalled();
	errorSpy.mockClear();
	warnSpy.mockClear();
});
