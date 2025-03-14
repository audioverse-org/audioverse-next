import { DehydratedState, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsResult } from 'next';

import serializableDehydrate from './serializableDehydrate';

export type DehydratedProps<T = Record<string, unknown>> =
	GetServerSidePropsResult<
		T & {
			dehydratedState: DehydratedState;
		}
	>;

export default async function getDehydratedProps<
	T extends Record<string, unknown>,
>(client: QueryClient, otherProps?: T): Promise<DehydratedProps<T>> {
	return {
		props: {
			...(otherProps as T),
			dehydratedState: serializableDehydrate(client),
		},
	};
}
