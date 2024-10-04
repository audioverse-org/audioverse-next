import { calculateItemsPerPage, GRID_GAP } from './index.helpers';

const scenarios = [
	[1, 1, 1, 1],
	[2 + GRID_GAP, 1, 1, 2],
];

describe('cardSlider helpers', () => {
	it.each(scenarios)(
		`calculates %i %i %i`,
		(width: number, rows: number, minItemWidth: number, expected: number) => {
			const r = calculateItemsPerPage(width, rows, minItemWidth);
			expect(r).toEqual(expected);
		},
	);
});
