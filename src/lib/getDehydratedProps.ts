import { GetServerSidePropsResult } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query';

export type DehydratedProps<T = any> = GetServerSidePropsResult<
	T & {
		dehydratedState: DehydratedState;
	}
>;

export default async function getDehydratedProps<T extends Record<any, any>>(
	queryPairs: [string, () => Promise<any>][],
	otherProps?: T
): Promise<DehydratedProps<T>> {
	const queryClient = new QueryClient();

	await Promise.all(queryPairs.map((p) => queryClient.prefetchQuery(...p)));

	return {
		props: {
			...(otherProps as T),
			dehydratedState: dehydrate(queryClient),
		},
	};
}
