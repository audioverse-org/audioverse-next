import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';

export default function serializableDehydrate(
	client: QueryClient
): DehydratedState {
	return JSON.parse(JSON.stringify(dehydrate(client)));
}
