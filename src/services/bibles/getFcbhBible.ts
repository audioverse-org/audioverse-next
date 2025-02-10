import { getFcbhBibles } from './getFcbhBibles';
import { IBibleVersion } from './types';

const fcbhBibles = getFcbhBibles('en');

export default function getFcbhBible(
	versionId: string,
): IBibleVersion | undefined {
	return fcbhBibles?.find((bible) => bible.id === versionId);
}
