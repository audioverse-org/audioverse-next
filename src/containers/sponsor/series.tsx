import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { BaseColors } from '@lib/constants';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';

import SponsorPivot from './pivot';
import { makeSponsorSeriesRoute } from '@lib/routes/makeSponsorSeriesRoute';
import { GetSponsorSeriesPageDataQuery } from '@containers/sponsor/__generated__/series';

export type SponsorSeriesProps = PaginatedProps<
	NonNullable<GetSponsorSeriesPageDataQuery['sequences']['nodes']>[0],
	GetSponsorSeriesPageDataQuery
>;

type SponsorSeriesPropsNarrowed = {
	data: {
		sponsor: NonNullable<GetSponsorSeriesPageDataQuery['sponsor']>;
	};
};

function SponsorSeries({
	nodes,
	data: { sponsor },
	pagination,
}: Must<SponsorSeriesProps> & SponsorSeriesPropsNarrowed): JSX.Element {
	return (
		<SponsorPivot {...{ sponsor }}>
			<LineHeading color={BaseColors.RED}>
				<FormattedMessage
					id="sponsorSeriesDetail__heading"
					defaultMessage="All Series"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardSequence sequence={node} key={node.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					makeSponsorSeriesRoute(languageRoute, sponsor.id, pageIndex)
				}
			/>
		</SponsorPivot>
	);
}

export default withFailStates<SponsorSeriesProps, SponsorSeriesPropsNarrowed>(
	SponsorSeries,
	{
		useShould404: ({ nodes, data }) => !nodes?.length || !data?.sponsor,
	}
);
