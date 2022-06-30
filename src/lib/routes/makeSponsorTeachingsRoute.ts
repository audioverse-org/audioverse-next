import { Scalars } from '@lib/generated/graphql';

export const makeSponsorTeachingsRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/sponsors/${sponsorId}/teachings${
		page > 1 ? `/page/${page}` : ''
	}`;
