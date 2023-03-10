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

type Props = Omit<SponsorsProps, 'sponsors'>;

export default function AllSponsors(props: Props) {
	const endRef = useRef<HTMLDivElement>(null);
	const hasReachedEnd = useOnScreen(endRef);
	const language = useLanguageId();

	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
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

	const sponsors = data?.pages.flatMap((p) => p.sponsors.nodes || []) || [];

	useEffect(() => {
		if (hasNextPage && hasReachedEnd) {
			fetchNextPage();
		}
	}, [hasNextPage, hasReachedEnd, fetchNextPage]);

	return (
		<>
			<Sponsors {...props} title="All" sponsors={sponsors} />
			<div ref={endRef} />
		</>
	);
}
