import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import CardSlider from '~components/organisms/cardSlider';

import styles from './index.module.scss';

const PRELOAD_COUNT = 3;

export type SectionNode<T> = T & {
	canonicalPath: string;
};

type SectionRoot<T> = {
	nodes: SectionNode<T>[];
};

type SectionProps<T, N> = {
	heading: string | JSX.Element;
	previous: string;
	next: string;
	rows?: number;
	seeAllUrl?: string;
	infiniteQueryResult: UseInfiniteQueryResult<T>;
	selectNodes?: (page?: T) => Maybe<SectionNode<N>[]>;
	Card: (props: { node: SectionNode<N> }) => JSX.Element;
};

function isSectionRoot<T>(v: unknown): v is SectionRoot<T> {
	return typeof v === 'object' && v !== null && 'nodes' in v;
}

function selectSectionRoot<T, N>(page?: T): Maybe<SectionRoot<N>> {
	if (!page) return;
	return Object.values(page).find(isSectionRoot<N>);
}

function defaultSelectNodes<T, N>(page?: T): Maybe<SectionNode<N>[]> {
	return selectSectionRoot<T, N>(page)?.nodes || [];
}

export default function Section<T, N>({
	heading,
	infiniteQueryResult,
	selectNodes = defaultSelectNodes,
	Card,
	seeAllUrl,
	...props
}: SectionProps<T, N>): JSX.Element {
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
