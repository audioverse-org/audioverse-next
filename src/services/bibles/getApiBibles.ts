import { Language } from '~src/__generated__/graphql';

import {
	getApiBibles as _getApiBibles,
	GetApiBiblesQuery,
} from './__generated__/getApiBibles';

export type ApiBible = NonNullable<
	GetApiBiblesQuery['collections']['nodes']
>[0];

export async function getApiBibles(
	languageId: Language,
): Promise<ApiBible[] | null> {
	const apiData = await _getApiBibles({
		language: languageId,
	}).catch(() => null);

	return apiData?.collections.nodes || null;
}
