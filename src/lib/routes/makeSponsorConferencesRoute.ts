import { Scalars } from '@lib/generated/graphql';

export const makeSponsorConferencesRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/sponsors/${sponsorId}/conferences${
		page > 1 ? `/page/${page}` : ''
	}`;
