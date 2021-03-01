import React from 'react';

import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import useLanguageRoute from '@lib/useLanguageRoute';
import { PresenterStaticProps } from '@pages/[language]/presenters/[id]/page/[i]';

type Props = PresenterStaticProps['props'];

function Presenter({ rssPath, nodes, data, pagination }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	return (
		<>
			{rssPath && (
				<a href={rssPath} target={'_blank'} rel={'noreferrer noopener'}>
					RSS
				</a>
			)}
			<RecordingList recordings={nodes} />
			<Pagination
				base={`/${languageRoute}/presenters/${data?.person?.id}`}
				{...pagination}
			/>
		</>
	);
}

export default Presenter;
