import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardCollection from '@components/molecules/card/collection';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { BaseColors } from '@lib/constants';
import {
	GetSponsorConferencesPageDataQuery,
	SponsorPivotFragment,
} from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorConferencesRoute } from '@lib/routes';

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
					makeSponsorConferencesRoute(languageRoute, sponsor.id, pageIndex)
				}
			/>
		</SponsorPivot>
	);
}

export default withFailStates(SponsorConferences, {
	should404: ({ nodes }) => !nodes?.length,
});
