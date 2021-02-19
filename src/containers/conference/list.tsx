import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import { makeConferenceRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { ConferenceListStaticProps } from '@pages/[language]/conferences/page/[i]';

type Props = ConferenceListStaticProps['props'];

function ConferenceList({ nodes, pagination }: Props): JSX.Element {
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
						<a href={makeConferenceRoute(languageRoute, n.id, 1)}>
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
