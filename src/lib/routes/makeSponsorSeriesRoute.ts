import { Scalars } from '@src/__generated__/graphql';

export const makeSponsorSeriesRoute = (
	languageRoute: string,
	sponsorId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/sponsors/${sponsorId}/series${
		page > 1 ? `/page/${page}` : ''
	}`;
