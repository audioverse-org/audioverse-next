import React from 'react';
import { FormattedMessage } from 'react-intl';

import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import { makePersonRoute } from '@lib/routes';
import { PresenterStaticProps } from '@pages/[language]/presenters/[id]/page/[i]';

type Props = PresenterStaticProps['props'];

function Presenter({ rssPath, nodes, data, pagination }: Props): JSX.Element {
	return (
		<>
			{rssPath && (
				<a href={rssPath} target={'_blank'} rel={'noreferrer noopener'}>
					<FormattedMessage
						id="presenterDetailPage__rssLabel"
						defaultMessage="RSS"
						description="Presenter detail page RSS label"
					/>
				</a>
			)}
			<RecordingList recordings={nodes} />
			<Pagination
				makeRoute={(l, i) => makePersonRoute(l, data?.person?.id || '', i)}
				{...pagination}
			/>
		</>
	);
}

export default Presenter;
