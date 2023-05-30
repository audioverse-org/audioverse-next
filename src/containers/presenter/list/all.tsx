import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

import { fetchApi } from '~lib/api/fetchApi';
import useOnScreen from '~lib/hooks/useOnScreen';
import { useLanguageId } from '~lib/useLanguageId';
import { Maybe } from '~src/__generated__/graphql';

import {
	GetPresenterListAllPageDataDocument,
	GetPresenterListAllPageDataQuery,
} from './__generated__/all';
import List, { PresentersProps } from './list';

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
