import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import useLanguageRoute from '@lib/useLanguageRoute';
import { PresentersStaticProps } from '@pages/[language]/presenters/page/[i]';

type Props = PresentersStaticProps['props'];

function Presenters({ nodes, pagination }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();

	return (
		<>
			<ul>
				{nodes.map((n) => (
					<li key={n.id}>{n.name}</li>
				))}
			</ul>
			<Pagination base={`/${languageRoute}/presenters`} {...pagination} />
		</>
	);
}

export default withFailStates(Presenters, ({ nodes }) => !nodes.length);
