import { ENTRIES_PER_PAGE } from '~lib/constants';

export default function getPageOffset(page: number | string): number {
	return (+page - 1) * ENTRIES_PER_PAGE;
}
