import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import CardSequence from '~components/molecules/card/sequence';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import { BaseColors } from '~lib/constants';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import AndFailStates from '~src/components/templates/andFailStates';
import { Must } from '~src/types/types';

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

const WithFailStates = (props: Parameters<typeof SponsorSeries>[0]) => (
	<AndFailStates
		Component={SponsorSeries}
		componentProps={props}
		options={{ should404: ({ nodes }) => !nodes?.length }}
	/>
);
export default WithFailStates;
