import React from 'react';
import { FormattedMessage } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import RssAlternate from '@components/molecules/rssAlternate';
import { BaseColors } from '@lib/constants';
import {
	GetSponsorTeachingsPageDataQuery,
	SponsorPivotFragment,
} from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorFeedRoute, makeSponsorTeachingsRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import SponsorPivot from './pivot';

export type SponsorTeachingsProps = PaginatedProps<
	NonNullable<
		NonNullable<
			GetSponsorTeachingsPageDataQuery['sponsor']
		>['recordings']['nodes']
	>[0],
	GetSponsorTeachingsPageDataQuery
>;

function SponsorTeachings({
	nodes,
	data: { sponsor },
	pagination,
}: Must<SponsorTeachingsProps> & {
	data: { sponsor: Must<SponsorPivotFragment> };
}): JSX.Element {
	const languageRoute = useLanguageRoute();
	return (
		<SponsorPivot {...{ sponsor }}>
			<RssAlternate url={makeSponsorFeedRoute(languageRoute, sponsor.id)} />
			<LineHeading color={BaseColors.RED}>
				<FormattedMessage
					id="sponsorTeachingsDetail__heading"
					defaultMessage="All Teachings"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardRecording recording={node} key={node.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					makeSponsorTeachingsRoute(languageRoute, sponsor.id, pageIndex)
				}
			/>
		</SponsorPivot>
	);
}

export default withFailStates(SponsorTeachings, {
	useShould404: ({ nodes }) => !nodes?.length,
});
