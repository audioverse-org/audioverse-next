import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import { makeSponsorRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { ConferenceStaticProps } from '@pages/[language]/conferences/[id]/page/[i]';

type Props = ConferenceStaticProps['props'];

function ConferenceDetail({ nodes, data, pagination }: Props): JSX.Element {
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
			<RecordingList recordings={nodes} />
			<Pagination
				base={`/${languageRoute}/conferences/${data?.conference?.id}`}
				{...pagination}
			/>
		</>
	);
}

export default withFailStates(ConferenceDetail, ({ nodes }) => !nodes?.length);
