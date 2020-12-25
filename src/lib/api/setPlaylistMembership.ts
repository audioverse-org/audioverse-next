import { fetchApi } from '@lib/api/fetchApi';

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
	recordingId: string,
	playlistId: string,
	add: boolean
): Promise<boolean> {
	const mutation = add ? mutationAdd : mutationRemove;
	const variables = { recordingId, playlistId };
	const result = await fetchApi(mutation, { variables });
	console.log({ m: 'set membership', recordingId, playlistId, add, result });

	return result.ok;
}

// TODO: implement
