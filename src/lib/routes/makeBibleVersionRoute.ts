import { Scalars } from '@lib/generated/graphql';

export const makeBibleVersionRoute = (
	languageRoute: string,
	versionId: Scalars['ID']
): string => `/${languageRoute}/bibles/${versionId}`;
