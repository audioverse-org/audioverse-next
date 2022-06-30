import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { BaseColors } from '@lib/constants';
import { GetSponsorSeriesPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';

import SponsorPivot from './pivot';
import { makeSponsorSeriesRoute } from '@lib/routes/makeSponsorSeriesRoute';

export type SponsorSeriesProps = PaginatedProps<
	NonNullable<GetSponsorSeriesPageDataQuery['sequences']['nodes']>[0],
	GetSponsorSeriesPageDataQuery
>;

function SponsorSeries({
	nodes,
	data: { sponsor },
	pagination,
}: Must<SponsorSeriesProps>): JSX.Element {
	if (!sponsor) {
		throw new Error('Unreachable');
	}

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

export default withFailStates(SponsorSeries, {
	useShould404: ({ nodes, data }) => !nodes?.length || !data?.sponsor,
});
