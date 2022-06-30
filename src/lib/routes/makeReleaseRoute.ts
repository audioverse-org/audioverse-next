import { Scalars } from '@lib/generated/graphql';

export const makeReleaseRoute = (
	languageRoute: string,
	releaseId: Scalars['ID']
): string => `/${languageRoute}/releases/${releaseId}`;
