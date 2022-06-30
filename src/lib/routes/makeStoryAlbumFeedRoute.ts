import { Scalars } from '@lib/generated/graphql';

export const makeStoryAlbumFeedRoute = (
	languageRoute: string,
	storyAlbumId: Scalars['ID']
): string => `/${languageRoute}/stories/albums/${storyAlbumId}/feed.xml`;
