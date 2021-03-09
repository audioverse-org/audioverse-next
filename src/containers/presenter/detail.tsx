import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import PaginatedList from '@components/templates/paginatedList';
import { makePersonRoute, makeSermonRoute } from '@lib/routes';
import { PresenterStaticProps } from '@pages/[language]/presenters/[id]/page/[i]';

type Props = PresenterStaticProps['props'];

function Presenter({ rssPath, nodes, data, pagination }: Props): JSX.Element {
	return (
		<PaginatedList
			pageTitle={data?.person?.name || ''}
			pageImage={data?.person?.imageWithFallback.url}
			nodes={nodes}
			makePageRoute={(l, i) => makePersonRoute(l, data?.person?.id || '', i)}
			makeEntryRoute={(l, n) => makeSermonRoute(l, n.id)}
			parseEntryTitle={(n) => n.title}
			parseEntryImageUrl={(n) => n.imageWithFallback?.url}
			parseEntryKey={(n) => n.id}
			pagination={pagination}
		>
			{rssPath && (
				<a href={rssPath} target={'_blank'} rel={'noreferrer noopener'}>
					<FormattedMessage
						id="presenterDetailPage__rssLabel"
						defaultMessage="RSS"
						description="Presenter detail page RSS label"
					/>
				</a>
			)}
			<div>{data?.person?.summary}</div>
			<div
				dangerouslySetInnerHTML={{ __html: data?.person?.description || '' }}
			/>
		</PaginatedList>
	);
}

export default withFailStates(Presenter, ({ nodes }) => !nodes.length);
