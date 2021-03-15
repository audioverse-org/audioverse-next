import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import TableList from '@components/organisms/tableList';
import {
	makeSeriesDetailRoute,
	makeSponsorRoute,
	makeSponsorSeriesRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { useQueryString } from '@lib/useQueryString';
import { SponsorSeriesStaticProps } from '@pages/[language]/sponsors/[id]/series/page/[i]';

type Props = SponsorSeriesStaticProps['props'];

function SponsorSeries({ data, nodes, pagination }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	const id = useQueryString('id') || '';
	const imageSrc = data?.sponsor?.imageWithFallback.url;
	return (
		<>
			{imageSrc && <img src={imageSrc} alt={data?.sponsor?.title} />}
			<h1>
				<a href={makeSponsorRoute(languageRoute, id)}>{data?.sponsor?.title}</a>
			</h1>
			<h2>
				<FormattedMessage
					id={'sponsorSeriesPage__title'}
					defaultMessage={'Series'}
					description={'Sponsor series page title'}
				/>
			</h2>
			<TableList
				nodes={nodes}
				makeEntryRoute={(l, n) => makeSeriesDetailRoute(l, n.id)}
			/>
			<Pagination
				{...pagination}
				makeRoute={(l, i) => makeSponsorSeriesRoute(l, id, i)}
			/>
		</>
	);
}

export default withFailStates(SponsorSeries, ({ nodes }) => !nodes?.length);
