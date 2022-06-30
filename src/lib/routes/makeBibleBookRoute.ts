import { Scalars } from '@lib/generated/graphql';

export const makeBibleBookRoute = (
	languageRoute: string,
	bookId: Scalars['ID'],
	chapterNumber: Scalars['ID'] = 1
): string => `/${languageRoute}/bibles/${bookId + ''}/${chapterNumber}`;
