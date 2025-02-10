import { Language } from '~src/__generated__/graphql';

import {
	getApiVersions,
	GetApiVersionsQuery,
} from './__generated__/getAllVersions';
import { FCBH_VERSIONS } from './api/fetchFcbhBibles';

type Version = NonNullable<GetApiVersionsQuery['collections']['nodes']>[0];

export default async function getAllVersions(): Promise<Version[]> {
	const apiVersions = await getApiVersions({ language: Language.English });

	if (!apiVersions.collections.nodes) {
		throw new Error('No API versions found');
	}

	return [...FCBH_VERSIONS, ...apiVersions.collections.nodes];
}
