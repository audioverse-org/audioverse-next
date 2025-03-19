import getFcbhVersion from './fcbh/getFcbhVersion';
import fetchGraphqlVersion, {
	GraphqlVersion,
} from './graphql/fetchGraphqlVersion';
import { versionSchema } from './schemas/version';
import { transformVersion } from './transforms/versionTransforms';

export default async function getVersion(
	versionId: string,
): Promise<GraphqlVersion | undefined> {
	const fcbhMatch = getFcbhVersion(versionId);

	if (fcbhMatch) {
		return versionSchema.transform(transformVersion).parse(fcbhMatch);
	}

	const apiMatch = await fetchGraphqlVersion(versionId);

	return apiMatch || undefined;
}
