import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import CardSlider from '~components/organisms/cardSlider';
import { BaseColors } from '~src/lib/constants';
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
type PageInfoSelector<T> = (page?: T) => Maybe<PageInfo>;
type Card<T> = (props: { node: SectionNode<T> }) => JSX.Element;

type SectionProps<T, V, O, N> = {
	infiniteQuery: T;
	variables?: V;
	options?: O;
	heading: string | JSX.Element;
	previous: string;
	next: string;
	rows?: number;
	minCardWidth?: number;
	seeAllUrl?: string;
	isDarkBg?: boolean;
	hasBg?: boolean;
	selectNodes?: NodeSelector<InferGraphqlInfiniteQueryType<T>, N>;
	selectPageInfo?: PageInfoSelector<InferGraphqlInfiniteQueryType<T>>;
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

export default function Section<T extends GraphqlInfiniteQuery, V, O, N>({
	infiniteQuery,
	variables,
	options,
	heading,
	selectNodes = defaultSelectNodes,
	selectPageInfo = defaultSelectPageInfo,
	Card,
	seeAllUrl,
	isDarkBg,
	hasBg,
	...props
}: SectionProps<T, V, O, N>): JSX.Element {
	const language = useLanguageId();

	const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
		infiniteQuery(
			{ language, ...variables },
			{
				initialPageParam: null,
				getNextPageParam: (last: Maybe<InferGraphqlInfiniteQueryType<T>>) => {
					if (!last) return;
					const pageInfo = selectPageInfo(last);
					if (!pageInfo?.hasNextPage) return;
					return {
						after: pageInfo.endCursor,
					};
				},
				...options,
			},
		);

	const cards = useMemo(
		() =>
			data?.pages
				.flatMap(selectNodes)
				.filter((n: Maybe<SectionNode<N>>): n is SectionNode<N> => !!n)
				.map((n: SectionNode<N>) => <Card node={n} key={n.canonicalPath} />) ??
			[],
		[Card, data?.pages, selectNodes],
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
		[fetchNextPage, isFetchingNextPage, hasNextPage],
	);

	// Check if there's content to render, if not, return an empty JSX element
	if (cards.length < 1) {
		return <></>;
	}

	return (
		<div className={styles.section}>
			<LineHeading
				variant="overline"
				color={isDarkBg ? BaseColors.SALMON : BaseColors.RED}
				unpadded
			>
				<span>{heading}</span>
				{seeAllUrl && (
					<a
						className={`${styles.seeAll} ${isDarkBg && styles.seeAlldbg}`}
						href={seeAllUrl}
					>
						<FormattedMessage id="discover__seeAll" defaultMessage="See All" />
					</a>
				)}
			</LineHeading>
			<CardSlider
				{...props}
				onIndexChange={preload}
				items={cards}
				isDarkBg={isDarkBg}
				hasBg={hasBg}
			/>
		</div>
	);
}
