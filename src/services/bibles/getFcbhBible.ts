import { ApiBible } from './getApiBibles';
import { getFcbhBibles } from './getFcbhBibles';

export function getFcbhBible(bibleId: string): ApiBible | undefined {
	return getFcbhBibles('en')?.find(({ id }) => id === bibleId);
}
