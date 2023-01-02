import './testSetup';
import { afterEach, expect, vi } from 'vitest';

const errorSpy = vi.spyOn(global.console, 'error');
const warnSpy = vi.spyOn(global.console, 'warn');

afterEach(() => {
	expect(errorSpy).not.toHaveBeenCalled();
	expect(warnSpy).not.toHaveBeenCalled();
	errorSpy.mockClear();
	warnSpy.mockClear();
});
