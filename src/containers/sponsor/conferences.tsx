import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardCollection from '@components/molecules/card/collection';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { BaseColors } from '@lib/constants';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';

import SponsorPivot from './pivot';
import { makeSponsorConferencesRoute } from '@lib/routes/makeSponsorConferencesRoute';
import { GetSponsorConferencesPageDataQuery } from '@containers/sponsor/__generated__/conferences';

export type SponsorConferencesProps = PaginatedProps<
	NonNullable<GetSponsorConferencesPageDataQuery['collections']['nodes']>[0],
	GetSponsorConferencesPageDataQuery
>;

type SponsorConferencesPropsNarrowed = {
	data: {
		sponsor: NonNullable<GetSponsorConferencesPageDataQuery['sponsor']>;
	};
};

function SponsorConferences({
	nodes,
	data: { sponsor },
	pagination,
}: Must<SponsorConferencesProps> &
	SponsorConferencesPropsNarrowed): JSX.Element {
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

export default withFailStates<
	SponsorConferencesProps,
	SponsorConferencesPropsNarrowed
>(SponsorConferences, {
	useShould404: (props) => {
		return !props?.nodes?.length || !props?.data?.sponsor;
	},
});
