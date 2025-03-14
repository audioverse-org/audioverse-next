import { IBibleVersion } from '../types';
import { getFcbhBibles } from './getFcbhBibles';

const fcbhBibles = getFcbhBibles('en');

export default function getFcbhBible(
	versionId: string | number,
): IBibleVersion | undefined {
	return fcbhBibles?.find((bible) => bible.id === versionId.toString());
}
