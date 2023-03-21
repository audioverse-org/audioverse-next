import Sponsors, { SponsorsProps } from './list';
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchApi } from '@lib/api/fetchApi';
import {
	GetSponsorListAllPageDataDocument,
	GetSponsorListAllPageDataQuery,
} from '@lib/generated/graphql';
import { useLanguageId } from '@lib/useLanguageId';
import useOnScreen from '@lib/hooks/useOnScreen';
import { useIntl } from 'react-intl';

type Props = Omit<SponsorsProps, 'sponsors'>;

export default function AllSponsors(props: Props) {
	const endRef = useRef<HTMLDivElement>(null);
	const intl = useIntl();
	const hasReachedEnd = useOnScreen(endRef);
	const language = useLanguageId();

	const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery(
		['sponsors'],
		({ pageParam = null }) =>
			fetchApi(GetSponsorListAllPageDataDocument, {
				variables: {
					language,
					after: pageParam,
				},
			}),
		{
			getNextPageParam: ({ sponsors }: GetSponsorListAllPageDataQuery) =>
				sponsors.pageInfo.hasNextPage ? sponsors.pageInfo.endCursor : undefined,
		}
	);

	useEffect(() => {
		if (!hasNextPage) return;
		if (!hasReachedEnd) return;
		if (isLoading) return;
		fetchNextPage();
	}, [hasNextPage, hasReachedEnd, fetchNextPage, isLoading]);

	const sponsors = data?.pages.flatMap((p) => p.sponsors.nodes || []) || [];

	return (
		<>
			<Sponsors
				{...props}
				title={intl.formatMessage({
					id: 'sponsorsListAll__all',
					defaultMessage: 'All',
				})}
				sponsors={sponsors}
			/>
			<div ref={endRef} />
		</>
	);
}
