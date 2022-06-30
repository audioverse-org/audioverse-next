import { Scalars } from '@src/__generated__/graphql';

export const makeReleaseRoute = (
	languageRoute: string,
	releaseId: Scalars['ID']
): string => `/${languageRoute}/releases/${releaseId}`;
