import { Language } from '~src/__generated__/graphql';

import {
	getGraphqlVersions,
	GetGraphqlVersionsQuery,
} from './__generated__/getVersions';
import { FCBH_VERSIONS } from './fcbh/fetchFcbhBibles';

type Version = NonNullable<GetGraphqlVersionsQuery['collections']['nodes']>[0];

export default async function getVersions(): Promise<Version[]> {
	const apiVersions = await getGraphqlVersions({ language: Language.English });

	if (!apiVersions.collections.nodes) {
		throw new Error('No API versions found');
	}

	return [...FCBH_VERSIONS, ...apiVersions.collections.nodes];
}
