import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import withFailStates from '~components/HOCs/withFailStates';
import CardSequence from '~components/molecules/card/sequence';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import { BaseColors } from '~lib/constants';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';

import { SponsorPivotFragment } from './__generated__/pivot';
import { GetSponsorSeriesPageDataQuery } from './__generated__/series';
import SponsorPivot from './pivot';

export type SponsorSeriesProps = PaginatedProps<
	NonNullable<GetSponsorSeriesPageDataQuery['sequences']['nodes']>[0],
	GetSponsorSeriesPageDataQuery
>;

function SponsorSeries({
	nodes,
	data: { sponsor },
	pagination,
}: Must<SponsorSeriesProps> & {
	data: { sponsor: Must<SponsorPivotFragment> };
}): JSX.Element {
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
					root
						.lang(languageRoute)
						.sponsors.id(sponsor.id)
						.series.page(pageIndex)
						.get()
				}
			/>
		</SponsorPivot>
	);
}

export default withFailStates(SponsorSeries, {
	useShould404: ({ nodes }) => !nodes?.length,
});
