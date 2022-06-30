import { Scalars } from '@src/__generated__/graphql';

export const makeSponsorTeachingsRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/sponsors/${sponsorId}/teachings${
		page > 1 ? `/page/${page}` : ''
	}`;
