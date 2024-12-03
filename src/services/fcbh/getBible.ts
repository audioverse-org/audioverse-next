import { getBibles } from './getBibles';
import { IBibleVersion } from './types';

export async function getBible(
	bibleId: string,
): Promise<IBibleVersion | null | undefined> {
	return getBibles().then((bibles) => bibles?.find(({ id }) => id === bibleId));
}
