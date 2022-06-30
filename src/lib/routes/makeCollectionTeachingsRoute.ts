import { Scalars } from '@lib/generated/graphql';

export const makeCollectionTeachingsRoute = (
	languageRoute: string,
	conferenceId: Scalars['ID'],
	page: string | number = 1
): string =>
	`/${languageRoute}/conferences/${conferenceId}/teachings${
		page > 1 ? `/page/${page}` : ''
	}`;
