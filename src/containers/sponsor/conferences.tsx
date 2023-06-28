import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import withFailStates from '~components/HOCs/withFailStates';
import CardCollection from '~components/molecules/card/collection';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import { BaseColors } from '~lib/constants';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import { Must } from '~src/types/types';

import { GetSponsorConferencesPageDataQuery } from './__generated__/conferences';
import { SponsorPivotFragment } from './__generated__/pivot';
import SponsorPivot from './pivot';

export type SponsorConferencesProps = PaginatedProps<
	NonNullable<GetSponsorConferencesPageDataQuery['collections']['nodes']>[0],
	GetSponsorConferencesPageDataQuery
>;

function SponsorConferences({
	nodes,
	data: { sponsor },
	pagination,
}: Must<SponsorConferencesProps> & {
	data: { sponsor: Must<SponsorPivotFragment> };
}): JSX.Element {
	return (
		<SponsorPivot {...{ sponsor }}>
			<LineHeading color={BaseColors.RED}>
				<FormattedMessage
					id="sponsorConferencesDetail__heading"
					defaultMessage="All Conferences"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardCollection collection={node} key={node.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					root
						.lang(languageRoute)
						.sponsors.id(sponsor.id)
						.conferences.page(pageIndex)
						.get()
				}
			/>
		</SponsorPivot>
	);
}

export default withFailStates(SponsorConferences, {
	useShould404: ({ nodes }) => !nodes?.length,
});
