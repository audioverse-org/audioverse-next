import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import useLanguageRoute from '@lib/useLanguageRoute';
import { PresentersStaticProps } from '@pages/[language]/presenters/page/[i]';
import { makePersonRoute } from '@lib/routes';
import { FormattedMessage } from 'react-intl';

type Props = PresentersStaticProps['props'];

function Presenters({ nodes, pagination }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<h1>
				<FormattedMessage
					id="presenterListPage__title"
					defaultMessage="Presenters"
					description="Presenter list page main title"
				/>
			</h1>
			<ul>
				{nodes.map((n) => (
					<li key={n.id}>
						<a href={makePersonRoute(languageRoute, n.id)}>
							<img src={n.imageWithFallback?.url} alt={n.name} />
							<span>{n.name}</span>
							<span>{n.summary}</span>
						</a>
					</li>
				))}
			</ul>
			<Pagination base={`/${languageRoute}/presenters`} {...pagination} />
		</>
	);
}

export default withFailStates(Presenters, ({ nodes }) => !nodes?.length);
