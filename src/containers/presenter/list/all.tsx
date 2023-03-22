import List, { PresentersProps } from './list';
import React, { useEffect, useRef } from 'react';
import {
	GetPresenterListAllPageDataDocument,
	GetPresenterListAllPageDataQuery,
} from '@lib/generated/graphql';
import { useInfiniteQuery } from 'react-query';
import useOnScreen from '@lib/hooks/useOnScreen';
import { fetchApi } from '@lib/api/fetchApi';
import { useLanguageId } from '@lib/useLanguageId';
import { useIntl } from 'react-intl';

export default function All(props: PresentersProps) {
	const endRef = useRef<HTMLDivElement>(null);
	const intl = useIntl();
	const hasReachedEnd = useOnScreen(endRef);
	const language = useLanguageId();

	const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery(
		['presenters'],
		({ pageParam = null }) =>
			fetchApi(GetPresenterListAllPageDataDocument, {
				variables: {
					language,
					after: pageParam,
				},
			}),
		{
			getNextPageParam: ({ persons }: GetPresenterListAllPageDataQuery) =>
				persons.pageInfo.hasNextPage ? persons.pageInfo.endCursor : undefined,
		}
	);

	useEffect(() => {
		if (!hasNextPage) return;
		if (!hasReachedEnd) return;
		if (isLoading) return;
		fetchNextPage();
	}, [hasNextPage, hasReachedEnd, fetchNextPage, isLoading]);

	const persons = data?.pages.flatMap((p) => p.persons.nodes || []) || [];

	return (
		<>
			<List
				{...props}
				title={intl.formatMessage({
					id: 'presentersListAll__all',
					defaultMessage: 'All',
				})}
				persons={persons}
			/>
			<div ref={endRef} />
		</>
	);
}
