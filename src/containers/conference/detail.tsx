import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import { makeConferenceRoute, makeSponsorRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { ConferenceStaticProps } from '@pages/[language]/conferences/[id]/page/[i]';

type Props = ConferenceStaticProps['props'];

function ConferenceDetail({
	nodes,
	data,
	pagination,
	rssPath,
}: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	const sponsorId = data?.conference?.sponsor?.id;

	return (
		<>
			<h1>{data?.conference?.title}</h1>
			<p>
				{data?.conference?.startDate} — {data?.conference?.endDate}
			</p>
			{sponsorId && (
				<a href={makeSponsorRoute(languageRoute, sponsorId)}>
					{data?.conference?.sponsor?.title}
				</a>
			)}
			<a href={rssPath} target={'_blank'} rel={'noreferrer noopener'}>
				<FormattedMessage
					id="conferenceDetail__rssLink"
					defaultMessage="RSS"
					description="Conference detail RSS link"
				/>
			</a>
			<RecordingList recordings={nodes} />
			<Pagination
				makeRoute={(l, i) =>
					makeConferenceRoute(l, data?.conference?.id || '', i)
				}
				{...pagination}
			/>
		</>
	);
}

export default withFailStates(ConferenceDetail, ({ nodes }) => !nodes?.length);
