/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	UseInfiniteQueryOptions,
	UseInfiniteQueryResult,
} from '@tanstack/react-query';

type GraphqlInfiniteQueryOptions<T> = Omit<
	UseInfiniteQueryOptions<T, unknown, unknown>,
	'queryKey'
> & {
	queryKey?: UseInfiniteQueryOptions<T, unknown, unknown>['queryKey'];
};

export type GraphqlInfiniteQuery<T = any, V = any> = (
	variables: V,
	options: GraphqlInfiniteQueryOptions<T>,
) => UseInfiniteQueryResult<T, unknown>;

type X<T> = T extends GraphqlInfiniteQueryOptions<infer R> ? R : never;

export type InferGraphqlInfiniteQueryType<T> = T extends (
	variables: infer V,
	options: infer O,
) => UseInfiniteQueryResult<any, any>
	? X<O>
	: never;
