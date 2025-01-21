import getApiBible, { ApiBible } from './getApiBible';
import { getFcbhBibles } from './getFcbhBibles';

const fcbhBibles = getFcbhBibles('en');

export default async function getAnyBible(
	versionId: string,
): Promise<ApiBible | undefined> {
	const fcbhMatch = fcbhBibles?.find((bible) => bible.id === versionId);

	if (fcbhMatch) {
		return fcbhMatch;
	}

	const apiMatch = await getApiBible(versionId);

	return apiMatch || undefined;
}
