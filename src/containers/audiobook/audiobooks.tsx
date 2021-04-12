import React from 'react';
import { useIntl } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import PaginatedList from '@components/templates/paginatedList';
import { makeAudiobookListRoute, makeAudiobookRoute } from '@lib/routes';
import { AudiobooksStaticProps } from '@pages/[language]/books/page/[i]';

type Props = AudiobooksStaticProps['props'];

// TODO: rename this file to list.tsx

function Audiobooks({ nodes, pagination }: Props): JSX.Element {
	const intl = useIntl();

	return (
		<PaginatedList
			pageTitle={intl.formatMessage({
				id: 'audiobookListPage__title',
				defaultMessage: 'Audiobooks',
				description: 'Audiobook list page title',
			})}
			nodes={nodes}
			makePageRoute={makeAudiobookListRoute}
			makeEntryRoute={(l, n) => makeAudiobookRoute(l, n.id)}
			parseEntryImageUrl={(n) => n.imageWithFallback.url}
			parseEntryTitle={(n) => n.title}
			pagination={pagination}
		/>
	);
}

export default withFailStates(Audiobooks, ({ nodes }) => !nodes.length);
