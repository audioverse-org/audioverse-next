import { renderHook } from '@testing-library/react';

import isServerSide from '../isServerSide';
import { useLocalStorage } from './useLocalStorage';

jest.mock('../isServerSide');

describe('useLocalStorage', () => {
	beforeEach(() => {
		jest.mocked(isServerSide).mockReturnValue(false);
		localStorage.clear();
	});

	it('should store value in localStorage', () => {
		const { result } = renderHook(() =>
			useLocalStorage<string>('key', 'value'),
		);
		expect(result.current[0]).toBe('value');
		expect(localStorage.getItem('key')).toBe(JSON.stringify('value'));
	});

	it('should retrieve value from localStorage', () => {
		localStorage.setItem('key', JSON.stringify('value'));
		const { result } = renderHook(() =>
			useLocalStorage<string>('key', 'default'),
		);
		expect(result.current[0]).toBe('value');
	});

	it('retains value across re-renders', () => {
		const { result, rerender } = renderHook(() =>
			useLocalStorage<string>('key', 'value'),
		);
		expect(result.current[0]).toBe('value');
		rerender();
		expect(result.current[0]).toBe('value');
	});

	it('does not save default value if value is already in localStorage', () => {
		localStorage.setItem('key', JSON.stringify('value'));

		const { result, rerender } = renderHook(() =>
			useLocalStorage<string>('key', 'defaultValue'),
		);

		rerender();

		expect(result.current[0]).toBe('value');
		expect(localStorage.getItem('key')).toBe(JSON.stringify('value'));
	});
});
