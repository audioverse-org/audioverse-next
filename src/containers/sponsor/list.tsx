import React from 'react';
import { useIntl } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import PaginatedList from '@components/templates/paginatedList';
import { makeSponsorListRoute, makeSponsorRoute } from '@lib/routes';
import { SponsorsStaticProps } from '@pages/[language]/sponsors/page/[i]';

type Props = SponsorsStaticProps['props'];

function Sponsors({ nodes, pagination }: Props): JSX.Element {
	const intl = useIntl();
	return (
		<PaginatedList
			pageTitle={intl.formatMessage({
				id: 'sponsorsList__title',
				defaultMessage: 'Sponsors',
				description: 'Sponsors list page title',
			})}
			nodes={nodes}
			makePageRoute={makeSponsorListRoute}
			makeEntryRoute={(l, n) => makeSponsorRoute(l, n.id)}
			parseEntryTitle={(n) => n.title}
			parseEntryImageUrl={(n) => n.imageWithFallback.url}
			pagination={pagination}
		/>
	);
}

export default withFailStates(Sponsors, ({ nodes }) => !nodes?.length);
