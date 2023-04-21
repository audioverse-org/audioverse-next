import List, { PresentersProps } from './list';
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import useOnScreen from '@lib/hooks/useOnScreen';
import { fetchApi } from '@lib/api/fetchApi';
import { useLanguageId } from '@lib/useLanguageId';
import { useIntl } from 'react-intl';
import {
	GetPresenterListAllPageDataDocument,
	GetPresenterListAllPageDataQuery,
} from './__generated__/all';
import { Maybe } from '@src/__generated__/graphql';

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
			getNextPageParam: (lastPage: Maybe<GetPresenterListAllPageDataQuery>) =>
				lastPage?.persons.pageInfo.hasNextPage
					? lastPage.persons.pageInfo.endCursor
					: undefined,
		}
	);

	useEffect(() => {
		if (!hasNextPage) return;
		if (!hasReachedEnd) return;
		if (isLoading) return;
		fetchNextPage();
	}, [hasNextPage, hasReachedEnd, fetchNextPage, isLoading]);

	const persons = data?.pages.flatMap((p) => p?.persons.nodes || []) || [];

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
