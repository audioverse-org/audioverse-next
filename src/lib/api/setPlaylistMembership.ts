import { fetchApi } from '~lib/api/fetchApi';
import { Scalars } from '~src/__generated__/graphql';

const mutationAdd = `
mutation($recordingId: ID!, $playlistId: ID!) {
  playlistRecordingAdd(
    playlistId: $playlistId
    recordingId: $recordingId
  )
}
`;

const mutationRemove = `
mutation($recordingId: ID!, $playlistId: ID!) {
  playlistRecordingRemove(
    playlistId: $playlistId
    recordingId: $recordingId
  )
}
`;

export async function setPlaylistMembership(
	recordingId: Scalars['ID'],
	playlistId: Scalars['ID'],
	add: boolean
): Promise<boolean> {
	const mutation = add ? mutationAdd : mutationRemove;
	const variables = { recordingId, playlistId };
	const result = await fetchApi<{ ok: boolean }>(mutation, { variables });

	return result.ok;
}
