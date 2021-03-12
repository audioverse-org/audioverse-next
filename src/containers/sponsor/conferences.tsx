import React from 'react';
import TableList from '@components/organisms/tableList';
import { SponsorConferencesStaticProps } from '@pages/[language]/sponsors/[id]/conferences/page/[i]';
import {
	makeConferenceRoute,
	makeSponsorConferencesRoute,
	makeSponsorRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { useQueryString } from '@lib/useQueryString';
import { FormattedMessage } from 'react-intl';
import Pagination from '@components/molecules/pagination';
import withFailStates from '@components/HOCs/withFailStates';

type Props = SponsorConferencesStaticProps['props'];

function SponsorConferences({ nodes, data, pagination }: Props): JSX.Element {
	const id = useQueryString('id') || '';
	const languageRoute = useLanguageRoute();
	return (
		<>
			<h1>
				<a href={makeSponsorRoute(languageRoute, id)}>{data?.sponsor?.title}</a>
			</h1>
			<h2>
				<FormattedMessage
					id={'sponsorConferencesPage__title'}
					defaultMessage={'Conferences'}
					description={'Sponsor conferences page title'}
				/>
			</h2>
			<TableList
				nodes={nodes}
				makeEntryRoute={(l, n) => makeConferenceRoute(l, n.id)}
			/>
			<Pagination
				makeRoute={(l, i) => makeSponsorConferencesRoute(l, id, i)}
				{...pagination}
			/>
		</>
	);
}

export default withFailStates(
	SponsorConferences,
	({ nodes }) => !nodes?.length
);
