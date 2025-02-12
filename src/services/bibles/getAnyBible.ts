import getFcbhBible from './fcbh/getFcbhBible';
import getApiBible, { ApiBible } from './getApiBible';
import { versionSchema } from './schemas/version';

export default async function getAnyBible(
	versionId: string,
): Promise<ApiBible | undefined> {
	const fcbhMatch = getFcbhBible(versionId);

	if (fcbhMatch) {
		return versionSchema.parse(fcbhMatch);
	}

	const apiMatch = await getApiBible(versionId);

	return apiMatch || undefined;
}
