import { GetServerSidePropsResult } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';

export type DehydratedProps = GetServerSidePropsResult<{
	dehydratedState: DehydratedState;
}>;

export default async function getDehydratedProps(
	queryPairs: [string, () => any][]
): Promise<DehydratedProps> {
	const queryClient = new QueryClient();

	await Promise.all(queryPairs.map((p) => queryClient.prefetchQuery(...p)));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
