import { ENTRIES_PER_PAGE } from '@lib/constants';

export default function getPaginationPageCount(totalNodes: number): number {
	return Math.ceil(totalNodes / ENTRIES_PER_PAGE);
}
