import React from 'react';

import { PresenterStaticProps } from '@pages/[language]/presenters/[id]/page/[i]';

type Props = PresenterStaticProps['props'];

function Presenter({ rssPath }: Props): JSX.Element {
	return (
		<>
			{rssPath && (
				<a href={rssPath} target={'_blank'} rel={'noreferrer noopener'}>
					RSS
				</a>
			)}
		</>
	);
}

export default Presenter;
