import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardCollection from '@components/molecules/card/collection';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { BaseColors } from '@lib/constants';
import { GetSponsorConferencesPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';

import SponsorPivot from './pivot';
import { makeSponsorConferencesRoute } from '@lib/routes/makeSponsorConferencesRoute';

export type SponsorConferencesProps = PaginatedProps<
	NonNullable<GetSponsorConferencesPageDataQuery['collections']['nodes']>[0],
	GetSponsorConferencesPageDataQuery
>;

function SponsorConferences({
	nodes,
	data: { sponsor },
	pagination,
}: Must<SponsorConferencesProps>): JSX.Element {
	if (!sponsor) {
		throw new Error('Unreachable');
	}

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
	useShould404: (props) => {
		return !props?.nodes?.length || !props?.data?.sponsor;
	},
});
