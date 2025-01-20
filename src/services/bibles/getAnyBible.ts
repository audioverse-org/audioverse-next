import { Language } from '~src/__generated__/graphql';

import { ApiBible, getApiBibles } from './getApiBibles';
import { getFcbhBibles } from './getFcbhBibles';

const fcbhBibles = getFcbhBibles('en');

export default async function getAnyBible(
	versionId: string,
): Promise<ApiBible | undefined> {
	const fcbhMatch = fcbhBibles?.find((bible) => bible.id === versionId);

	if (fcbhMatch) {
		return fcbhMatch;
	}

	const apiBibles = await getApiBibles(Language.English);

	return apiBibles?.find((bible) => bible.id === versionId);
}
