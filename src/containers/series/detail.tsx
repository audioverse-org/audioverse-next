import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import RssLink from '@components/molecules/rssLink';
import {
	makeConferenceRoute,
	makeSeriesDetailRoute,
	makeSponsorRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { useQueryString } from '@lib/useQueryString';
import { SeriesDetailStaticProps } from '@pages/[language]/series/[id]/page/[i]';

type Props = SeriesDetailStaticProps['props'];

function SeriesDetail({ data, nodes, pagination, rssUrl }: Props) {
	const languageRoute = useLanguageRoute();
	const seriesId = useQueryString('id') || '';
	const sponsorId = data?.series?.sponsor?.id || '';
	const conferenceId = data?.series?.collection?.id || '';
	return (
		<>
			<img
				src={data?.series?.imageWithFallback.url}
				alt={data?.series?.title}
			/>
			<h1>{data?.series?.title}</h1>
			<RssLink href={rssUrl} />
			<p>
				<a href={makeSponsorRoute(languageRoute, sponsorId)}>
					<FormattedMessage
						id={'seriesDetail__sponsorLinkPrefix'}
						defaultMessage={'Sponsor:'}
						description={'Series detail page sponsor link prefix'}
					/>{' '}
					{data?.series?.sponsor?.title}
				</a>
			</p>
			{conferenceId && (
				<p>
					<a href={makeConferenceRoute(languageRoute, conferenceId)}>
						<FormattedMessage
							id={'seriesDetail__conferenceLinkPrefix'}
							defaultMessage={'Conference:'}
							description={'Series detail page conference link prefix'}
						/>{' '}
						{data?.series?.collection?.title}
					</a>
				</p>
			)}
			<RecordingList recordings={nodes} />
			<Pagination
				makeRoute={(l, i) => makeSeriesDetailRoute(l, seriesId, i)}
				{...pagination}
			/>
		</>
	);
}

export default withFailStates(SeriesDetail, ({ nodes }) => !nodes?.length);
