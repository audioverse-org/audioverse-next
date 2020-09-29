import * as api from '@lib/api';
import * as router from 'next/router';
import { Url } from 'url';
import { PrefetchOptions } from 'next/dist/next-server/lib/router/router';
import { ParsedUrlQuery } from 'querystring';

export function loadTestimonies(nodes: Testimony[] | null = null): void {
	jest.spyOn(api, 'getTestimonies').mockResolvedValue({
		nodes: nodes || [
			{
				author: 'the_testimony_author',
				body: 'the_testimony_body',
				writtenDate: 'the_testimony_date',
			},
		],
		aggregate: {
			count: 1,
		},
	});
}

interface TransitionOptions {}

export function loadQuery(query: ParsedUrlQuery = {}) {
	jest.spyOn(router, 'useRouter').mockReturnValue({
		asPath: '',
		back(): void {},
		basePath: '',
		beforePopState(cb): void {},
		events: { on: () => null, off: () => null, emit: () => null },
		isFallback: false,
		pathname: '',
		prefetch(
			url: string,
			asPath: string | undefined,
			options: PrefetchOptions | undefined
		): Promise<void> {
			return Promise.resolve(undefined);
		},
		push(
			url: Url,
			as: Url | undefined,
			options: TransitionOptions | undefined
		): Promise<boolean> {
			return Promise.resolve(false);
		},
		reload(): void {},
		replace(
			url: Url,
			as: Url | undefined,
			options: TransitionOptions | undefined
		): Promise<boolean> {
			return Promise.resolve(false);
		},
		route: '',
		query,
	});
}
