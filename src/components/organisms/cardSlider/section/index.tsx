import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import CardSlider from '~components/organisms/cardSlider';
import { useLanguageId } from '~src/lib/useLanguageId';
import {
	GraphqlInfiniteQuery,
	InferGraphqlInfiniteQueryType,
} from '~src/types/graphql-codegen';

import styles from './index.module.scss';

const PRELOAD_COUNT = 3;

export type SectionNode<T> = T & {
	canonicalPath: string;
};

type PageInfo = {
	hasNextPage: boolean;
	endCursor: string | null;
};
type SectionRoot<T> = {
	nodes: SectionNode<T>[];
	pageInfo: PageInfo;
};

type NodeSelector<T, N> = (page?: T) => Maybe<SectionNode<N>[]>;
type PageInfoSelector<T, _N> = (page?: T) => Maybe<PageInfo>;
type Card<T> = (props: { node: SectionNode<T> }) => JSX.Element;

type SectionProps<T, N> = {
	infiniteQuery: T;
	heading: string | JSX.Element;
	previous: string;
	next: string;
	rows?: number;
	minCardWidth?: number;
	seeAllUrl?: string;
	selectNodes?: NodeSelector<InferGraphqlInfiniteQueryType<T>, N>;
	selectPageInfo?: PageInfoSelector<
		InferGraphqlInfiniteQueryType<GraphqlInfiniteQuery>,
		N
	>;
	Card: Card<N>;
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

function defaultSelectPageInfo<T, N>(page?: T): Maybe<PageInfo> {
	return selectSectionRoot<T, N>(page)?.pageInfo || null;
}

export default function Section<T extends GraphqlInfiniteQuery, N>({
	infiniteQuery,
	heading,
	selectNodes = defaultSelectNodes,
	selectPageInfo = defaultSelectPageInfo,
	Card,
	seeAllUrl,
	...props
}: SectionProps<T, N>): JSX.Element {
	const language = useLanguageId();

	const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
		infiniteQuery(
			'after',
			{ language },
			{
				getNextPageParam: (last: Maybe<GraphqlInfiniteQuery>) => {
					if (!last) return;
					const pageInfo = selectPageInfo(last);
					if (!pageInfo?.hasNextPage) return;
					return {
						language,
						after: pageInfo.endCursor,
					};
				},
			}
		);

	const cards = useMemo(
		() =>
			data?.pages
				.flatMap(selectNodes)
				.filter((n): n is SectionNode<N> => !!n)
				.map((n) => <Card node={n} key={n.canonicalPath} />) ?? [],
		[Card, data?.pages, selectNodes]
	);

	const preload = useCallback(
		({ index, total }: { index: number; total: number }) => {
			if (
				index + PRELOAD_COUNT >= total &&
				!isFetchingNextPage &&
				hasNextPage
			) {
				fetchNextPage();
			}
		},
		[fetchNextPage, isFetchingNextPage, hasNextPage]
	);

	// Check if there's content to render, if not, return an empty JSX element
	if (cards.length < 1) {
		return <></>;
	}

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
