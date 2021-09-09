import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardSponsor from '@components/molecules/card/sponsor';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { GetSponsorListPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorListRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export type SponsorsProps = PaginatedProps<
	NonNullable<GetSponsorListPageDataQuery['sponsors']['nodes']>[0],
	GetSponsorListPageDataQuery
>;

// TODO: replace with sponsors landing page (featured, recent, trending, etc.)

function Sponsors({ nodes, pagination }: SponsorsProps): JSX.Element {
	const language = useLanguageRoute();

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={`/${language}/discover/collections`}
			heading={
				<FormattedMessage id="sponsorsList__title" defaultMessage="Sponsors" />
			}
			makeRoute={makeSponsorListRoute}
		>
			{nodes.map((node) => (
				<CardSponsor sponsor={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(Sponsors, ({ nodes }) => !nodes?.length);
