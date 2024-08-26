import {
	UseInfiniteQueryOptions,
	UseInfiniteQueryResult,
} from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GraphqlInfiniteQuery<T = any, V = any> = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pageParamKey: any,
	variables: V,
	options?: UseInfiniteQueryOptions<T, unknown, T>,
) => UseInfiniteQueryResult<T, unknown>;

export type InferGraphqlInfiniteQueryType<T> = T extends GraphqlInfiniteQuery
	? NonNullable<Parameters<T>[2]> extends UseInfiniteQueryOptions<
			infer T,
			unknown,
			unknown
		>
		? T
		: never
	: never;
