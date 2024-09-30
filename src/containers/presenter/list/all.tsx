import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import useOnScreen from '~lib/hooks/useOnScreen';
import { useLanguageId } from '~lib/useLanguageId';

import { useInfiniteGetPresenterListAllPageDataQuery } from './__generated__/all';
import styles from './all.module.scss';
import List, { PresentersProps } from './list';

export default function All(props: PresentersProps) {
	const endRef = useRef<HTMLDivElement>(null);
	const hasReachedEnd = useOnScreen(endRef);
	const language = useLanguageId();

	const { data, hasNextPage, fetchNextPage, isFetching } =
		useInfiniteGetPresenterListAllPageDataQuery(
			'after',
			{
				language,
				after: null,
			},
			{
				getNextPageParam: (lastPage) =>
					lastPage?.persons.pageInfo.hasNextPage
						? {
								after: lastPage.persons.pageInfo.endCursor,
						  }
						: undefined,
			}
		);

	useEffect(() => {
		if (!hasNextPage) return;
		if (!hasReachedEnd) return;
		if (isFetching) return;
		fetchNextPage();
	}, [hasNextPage, hasReachedEnd, fetchNextPage, isFetching]);

	const persons = data?.pages.flatMap((p) => p?.persons.nodes || []) || [];

	return (
		<>
			<List {...props} persons={persons} />
			<p className={styles.endMessage}>
				{isFetching && (
					<FormattedMessage
						id="presentersListAll__loading"
						defaultMessage="Loading..."
					/>
				)}
				{!hasNextPage && !isFetching && (
					<FormattedMessage
						id="presentersListAll__listEnd"
						defaultMessage="No more presenters"
					/>
				)}
			</p>
			<div ref={endRef} />
		</>
	);
}
