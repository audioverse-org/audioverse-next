import { FormattedMessage } from 'react-intl';

import LineHeading from '~components/atoms/lineHeading';
import withFailStates from '~components/HOCs/withFailStates';
import CardRecording from '~components/molecules/card/recording';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import RssAlternate from '~components/molecules/rssAlternate';
import { BaseColors } from '~lib/constants';
import { PaginatedProps } from '~lib/getPaginatedStaticProps';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import { Must } from '~src/types/types';

import { SponsorPivotFragment } from './__generated__/pivot';
import { GetSponsorTeachingsPageDataQuery } from './__generated__/teachings';
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
			<RssAlternate
				url={root.lang(languageRoute).sponsors.id(sponsor.id).feed.get()}
			/>
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
					root
						.lang(languageRoute)
						.sponsors.id(sponsor.id)
						.teachings.page(pageIndex)
						.get()
				}
			/>
		</SponsorPivot>
	);
}

export default withFailStates(SponsorTeachings, {
	useShould404: ({ nodes }) => !nodes?.length,
});
