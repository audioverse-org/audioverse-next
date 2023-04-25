import { GetServerSidePropsResult } from 'next';
import { dehydrate, DehydratedState, QueryClient } from 'react-query';

export type DehydratedProps<T = Record<string, unknown>> =
	GetServerSidePropsResult<
		T & {
			dehydratedState: DehydratedState;
		}
	>;

export default async function getDehydratedProps<
	T extends Record<string, unknown>
>(client: QueryClient, otherProps?: T): Promise<DehydratedProps<T>> {
	return {
		props: {
			...(otherProps as T),
			dehydratedState: dehydrate(client),
		},
	};
}
