import { dehydrate, DehydratedState, QueryClient } from 'react-query';

export default function serializableDehydrate(
	client: QueryClient
): DehydratedState {
	return JSON.parse(JSON.stringify(dehydrate(client)));
}
