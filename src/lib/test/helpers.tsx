import { ParsedUrlQuery } from 'querystring';

import { render, RenderResult } from '@testing-library/react';
import * as router from 'next/router';
import { NextRouter } from 'next/router';
import React from 'react';

import withIntl from '@components/HOCs/withIntl';
import * as api from '@lib/api';
import { getSermons } from '@lib/api';

export function loadSermons({
	nodes = undefined,
	count = undefined,
}: { nodes?: any[]; count?: number } = {}): void {
	(getSermons as jest.Mock).mockReturnValue(
		Promise.resolve({
			nodes: nodes || [
				{
					id: 1,
					title: 'the_sermon_title',
				},
			],
			aggregate: {
				count: count || 1,
			},
		})
	);
}

export function setSermonCount(count: number): void {
	jest.spyOn(api, 'getSermonCount').mockResolvedValue(count);
}

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

export function loadQuery(query: ParsedUrlQuery = {}): void {
	jest.spyOn(router, 'useRouter').mockReturnValue(({
		query,
	} as Partial<NextRouter>) as any);
}

export async function renderWithIntl<T>(
	Component: React.ComponentType<T>,
	props: T
): Promise<RenderResult> {
	const WithIntl = withIntl(Component);

	return render(<WithIntl {...props} />);
}
