import {
	UseInfiniteQueryOptions,
	UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import CardSlider from '~components/organisms/cardSlider';
import { Language } from '~src/__generated__/graphql';
import { useLanguageId } from '~src/lib/useLanguageId';

import styles from './index.module.scss';

const PRELOAD_COUNT = 3;

export type SectionNode<T> = T & {
	canonicalPath: string;
};

type SectionRoot<T> = {
	nodes: SectionNode<T>[];
	pageInfo: {
		hasNextPage: boolean;
		endCursor: string | null;
	};
};

type InfiniteQueryVariables = {
	language: Language;
	first: number;
	after: string | null;
};

type InfiniteQuery<T, V> = (
	pageParamKey: keyof V,
	variables: V,
	options?: UseInfiniteQueryOptions<T>
) => UseInfiniteQueryResult<T>;

type SectionProps<T, N> = {
	infiniteQuery: InfiniteQuery<T, InfiniteQueryVariables>;
	heading: string | JSX.Element;
	previous: string;
	next: string;
	rows?: number;
	seeAllUrl?: string;
	selectNodes?: (page?: T) => Maybe<SectionNode<N>[]>;
	Card: (props: { node: SectionNode<N> }) => JSX.Element;
};

function isSectionRoot<T>(v: unknown): v is SectionRoot<T> {
	return typeof v === 'object' && v !== null && 'nodes' in v;
}

function selectSectionRoot<T, N>(page: Maybe<T>): Maybe<SectionRoot<N>> {
	if (!page) return;
	return Object.values(page).find(isSectionRoot<N>);
}

function defaultSelectNodes<T, N>(page?: T): Maybe<SectionNode<N>[]> {
	return selectSectionRoot<T, N>(page)?.nodes || [];
}

export default function Section<T, N>({
	infiniteQuery,
	heading,
	selectNodes = defaultSelectNodes,
	Card,
	seeAllUrl,
	...props
}: SectionProps<T, N>): JSX.Element {
	const language = useLanguageId();
	const infiniteQueryResult = infiniteQuery(
		'after',
		{
			language,
			first: 6,
			after: null,
		},
		{
			getNextPageParam: (last: Maybe<T>) => {
				const sectionRoot = selectSectionRoot<T, N>(last);
				if (!sectionRoot) return;
				return {
					language,
					first: 6,
					after: sectionRoot.pageInfo.endCursor,
				};
			},
		}
	);
	const { data, fetchNextPage } = infiniteQueryResult;
	const pages = useMemo(() => data?.pages || [], [data?.pages]);
	const nodes: SectionNode<N>[] = useMemo(() => {
		return pages.flatMap(selectNodes).filter((n): n is SectionNode<N> => !!n);
	}, [pages, selectNodes]);

	const preload = useCallback(
		({ index, total }: { index: number; total: number }) => {
			if (index + PRELOAD_COUNT >= total) {
				fetchNextPage();
			}
		},
		[fetchNextPage]
	);

	const cards = useMemo(
		() => nodes.map((n) => <Card node={n} key={n.canonicalPath} />),
		[Card, nodes]
	);

	return (
		<div className={styles.section}>
			<LineHeading variant="overline" unpadded>
				<span>{heading}</span>
				{seeAllUrl && (
					<a className={styles.seeAll} href={seeAllUrl}>
						<FormattedMessage id="discover__seeAll" defaultMessage="See All" />
					</a>
				)}
			</LineHeading>
			<CardSlider {...props} onIndexChange={preload} items={cards} />
		</div>
	);
}
