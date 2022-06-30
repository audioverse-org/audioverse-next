import { Scalars } from '@lib/generated/graphql';

export const makePlaylistDetailRoute = (
	languageRoute: string,
	playlistId: Scalars['ID']
): string => `/${languageRoute}/library/playlist/${playlistId}`;
