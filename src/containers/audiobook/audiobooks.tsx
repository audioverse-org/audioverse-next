import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import { GetAudiobookListPageDataQuery } from '@lib/generated/graphql';
import { PaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeAudiobookRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export type AudiobooksProps = PaginatedStaticProps<GetAudiobookListPageDataQuery>['props'];

function Audiobooks({ nodes, pagination }: AudiobooksProps): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<h1>
				<FormattedMessage
					id="audiobooks__pageTitle"
					defaultMessage="Audiobooks"
					description="Audiobooks list page title"
				/>
			</h1>
			<ul>
				{nodes.map(({ id, title, imageWithFallback }) => (
					<li key={id}>
						<a href={makeAudiobookRoute(languageRoute, id)}>
							<img src={imageWithFallback.url} alt={title} width={25} />
							{title}
						</a>
					</li>
				))}
			</ul>
			<Pagination base={`/${languageRoute}/books`} {...pagination} />
		</>
	);
}

export default withFailStates(Audiobooks, ({ nodes }) => !nodes.length);
