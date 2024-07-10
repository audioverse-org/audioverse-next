export const MIN_CARD_WIDTH = 300;
export const GRID_GAP = 24;

export const calculateItemsPerPage = (
	width: number,
	rows: number,
	minItemWidth: number
) => {
	const usableSpace = width + GRID_GAP;
	const minSpace = minItemWidth + GRID_GAP;
	const perRow = Math.max(Math.floor(usableSpace / minSpace), 1);
	const rowCount = perRow > 1 ? rows : 1;
	return perRow * rowCount;
};
