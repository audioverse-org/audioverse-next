import { Scalars } from '@lib/generated/graphql';

export const makeSongAlbumFeedRoute = (
	languageRoute: string,
	albumId: Scalars['ID']
): string => `/${languageRoute}/songs/albums/${albumId}/feed.xml`;
