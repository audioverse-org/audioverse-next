import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';

import styles from './index.section.module.scss';
import Slider from './index.slider';

const PRELOAD_COUNT = 3;

export type SectionNode<T> = T & {
    canonicalPath: string;
};

type SectionProps<T, N> = {
    heading: string;
    previous: string;
    next: string;
    rows?: number;
    seeAllUrl?: string;
    infiniteQueryResult: UseInfiniteQueryResult<T>;
    selectNodes: (page?: T) => Maybe<SectionNode<N>[]>;
    Card: (props: { node: SectionNode<N> }) => JSX.Element;
};

export default function Section<T, N>({
    heading,
    infiniteQueryResult,
    selectNodes,
    Card,
    seeAllUrl,
    ...props
}: SectionProps<T, N>): JSX.Element {
    const { data, fetchNextPage } = infiniteQueryResult;
    const pages = useMemo(() => data?.pages || [], [data?.pages]);
    const nodes: SectionNode<N>[] = useMemo(() => {
        return pages.flatMap(selectNodes).filter((n): n is SectionNode<N> => !!n);
    }, [pages, selectNodes]);

    const preload = useCallback(({ index, total }: {
        index: number;
        total: number;
    }) => {
        if (index + PRELOAD_COUNT >= total) {
            fetchNextPage()
        }
    }, [fetchNextPage]);

    const cards = useMemo(() => nodes.map(
        (n) => <Card node={n} key={n.canonicalPath} />
    ), [Card, nodes])

    return (
        <div className={styles.section}>
            <LineHeading variant="overline">
                <span>{heading}</span>
                {seeAllUrl && (
                    <a href={seeAllUrl}>
                        <FormattedMessage id="discover__seeAll" defaultMessage="See All" />
                    </a>
                )}
            </LineHeading>
            <Slider
                {...props}
                onIndexChange={preload}
                items={cards}
            />
        </div>
    );
}