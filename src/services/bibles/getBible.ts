import getFcbhBible from './fcbh/getFcbhBible';
import fetchGraphqlBible, { GraphqlBible } from './graphql/fetchGraphqlBible';
import { versionSchema } from './schemas/version';
import { transformVersion } from './transforms/versionTransforms';

export default async function getBible(
	versionId: string,
): Promise<GraphqlBible | undefined> {
	const fcbhMatch = getFcbhBible(versionId);

	if (fcbhMatch) {
		return versionSchema.transform(transformVersion).parse(fcbhMatch);
	}

	const apiMatch = await fetchGraphqlBible(versionId);

	return apiMatch || undefined;
}
