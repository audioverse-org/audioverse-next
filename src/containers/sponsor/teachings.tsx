import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import {
	GetSponsorTeachingsPageDataQuery,
	SponsorPivotFragment,
} from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorTeachingsRoute } from '@lib/routes';

import SponsorPivot from './pivot';

export type SponsorTeachingsProps = PaginatedProps<
	NonNullable<
		NonNullable<
			GetSponsorTeachingsPageDataQuery['sponsor']
		>['recordings']['nodes']
	>[0],
	GetSponsorTeachingsPageDataQuery
> & { rssPath: string | null };

function SponsorTeachings({
	nodes,
	data: { sponsor },
	pagination,
}: Must<SponsorTeachingsProps> & {
	data: { sponsor: Must<SponsorPivotFragment> };
}): JSX.Element {
	return (
		<SponsorPivot {...{ sponsor }}>
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

export default withFailStates(SponsorTeachings, ({ nodes }) => !nodes?.length);
