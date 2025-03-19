import { IBibleVersion } from '../types';
import versions from './versions';

export default function getFcbhVersion(
	versionId: string | number,
): IBibleVersion | undefined {
	return versions.find((v) => v.id === versionId.toString());
}
