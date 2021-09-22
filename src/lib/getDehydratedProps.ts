import { GetServerSidePropsResult } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query';

export type DehydratedProps = GetServerSidePropsResult<{
	dehydratedState: DehydratedState;
}>;

export default async function getDehydratedProps(
	queryPairs: [string, () => Promise<any>][],
	otherProps?: Record<any, any>
): Promise<DehydratedProps> {
	const queryClient = new QueryClient();

	await Promise.all(queryPairs.map((p) => queryClient.prefetchQuery(...p)));

	return {
		props: {
			...otherProps,
			dehydratedState: dehydrate(queryClient),
		},
	};
}
