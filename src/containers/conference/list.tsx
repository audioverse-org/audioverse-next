import React from 'react';
import { GetConferenceListPageDataQuery } from '@lib/generated/graphql';
import { makeConferenceRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import Pagination from '@components/molecules/pagination';
import { PaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import withFailStates from '@components/HOCs/withFailStates';
import { FormattedMessage } from 'react-intl';

type Conferences = NonNullable<
	GetConferenceListPageDataQuery['conferences']['nodes']
>;

export type ConferenceListProps = {
	nodes: Conferences;
	pagination: PaginatedStaticProps['props']['pagination'];
};

function ConferenceList({
	nodes,
	pagination,
}: ConferenceListProps): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<h1>
				<FormattedMessage
					id="conferenceListPage__title"
					defaultMessage="Conferences"
					description="Conference list page main title"
				/>
			</h1>
			<ul>
				{nodes.map((n) => (
					<li key={n.id}>
						<a href={makeConferenceRoute(languageRoute, n.id)}>
							<img src={n.imageWithFallback?.url} alt={n.title} />
							<span>{n.title}</span>
							<span>{n.sponsor?.title}</span>
						</a>
					</li>
				))}
			</ul>

			<Pagination base={`/${languageRoute}/conferences`} {...pagination} />
		</>
	);
}

export default withFailStates(ConferenceList, ({ nodes }) => !nodes?.length);
