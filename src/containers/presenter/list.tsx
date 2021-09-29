import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import CardPerson from '@components/molecules/card/person';
import PaginatedCardList from '@components/organisms/paginatedCardList';
import { GetPresenterListPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makePresenterListRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export type PresentersProps = PaginatedProps<
	NonNullable<GetPresenterListPageDataQuery['persons']['nodes']>[0],
	GetPresenterListPageDataQuery
>;

// TODO: replace with presenters landing page (featured, recent, trending, etc.)

function Presenters({ nodes, pagination }: PresentersProps): JSX.Element {
	const language = useLanguageRoute();

	return (
		<PaginatedCardList
			pagination={pagination}
			backUrl={`/${language}/discover/collections`}
			heading={
				<FormattedMessage
					id="presenterListPage__title"
					defaultMessage="All Speakers"
				/>
			}
			makeRoute={makePresenterListRoute}
		>
			{nodes.map((node) => (
				<CardPerson person={node} key={node.canonicalPath} />
			))}
		</PaginatedCardList>
	);
}

export default withFailStates(Presenters, ({ nodes }) => !nodes?.length);
