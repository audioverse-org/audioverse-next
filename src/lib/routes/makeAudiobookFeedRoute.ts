import { Scalars } from '@lib/generated/graphql';

export const makeAudiobookFeedRoute = (
	languageRoute: string,
	bookId: Scalars['ID']
): string => `/${languageRoute}/books/${bookId}/feed.xml`;
