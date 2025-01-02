import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

import useOnScreen from '~lib/hooks/useOnScreen';
import { Maybe } from '~src/__generated__/graphql';
import { useLanguageId } from '~src/lib/hooks/useLanguageId';

import {
	GetSponsorListAllPageDataQuery,
	useInfiniteGetSponsorListAllPageDataQuery,
} from './__generated__/all';
import Sponsors, { SponsorsProps } from './list';

type Props = Omit<SponsorsProps, 'sponsors'>;

export default function AllSponsors(props: Props) {
	const endRef = useRef<HTMLDivElement>(null);
	const intl = useIntl();
	const hasReachedEnd = useOnScreen(endRef);
	const language = useLanguageId();

	const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
		useInfiniteGetSponsorListAllPageDataQuery(
			{ language, after: null },
			{
				getNextPageParam: (lastPage: Maybe<GetSponsorListAllPageDataQuery>) => {
					const pageInfo = lastPage?.sponsors.pageInfo;
					if (!pageInfo?.hasNextPage) return;
					return { after: pageInfo.endCursor };
				},
				initialPageParam: null,
			},
		);

	useEffect(() => {
		if (!hasNextPage) return;
		if (!hasReachedEnd) return;
		if (isLoading) return;
		if (isFetchingNextPage) return;
		fetchNextPage();
	}, [
		hasNextPage,
		hasReachedEnd,
		fetchNextPage,
		isLoading,
		isFetchingNextPage,
	]);

	const sponsors = data?.pages.flatMap((p) => p?.sponsors.nodes || []) || [];

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
