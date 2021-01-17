import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import { resetAllWhenMocks } from 'jest-when';

jest.mock('@lib/api/fetchApi');

beforeEach(() => {
	jest.resetAllMocks();
	resetAllWhenMocks();
});
