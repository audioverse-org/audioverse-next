import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import RssLink from '@components/molecules/rssLink';
import PaginatedList from '@components/templates/paginatedList';
import { GetPresenterRecordingsPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makePresenterDetailRoute, makeSermonRoute } from '@lib/routes';

export type PresenterRecordingsProps = PaginatedProps<
	NonNullable<
		NonNullable<
			NonNullable<
				GetPresenterRecordingsPageDataQuery['person']
			>['recordings']['nodes']
		>[0]
	>,
	GetPresenterRecordingsPageDataQuery
> & { rssPath: string | null };

function PresenterRecordings({
	rssPath,
	nodes,
	data,
	pagination,
}: PresenterRecordingsProps): JSX.Element {
	return (
		<PaginatedList
			pageTitle={data?.person?.name || ''}
			pageImage={data?.person?.imageWithFallback.url}
			nodes={nodes}
			makePageRoute={(l, i) =>
				makePresenterDetailRoute(l, data?.person?.id || '', i)
			}
			makeEntryRoute={(l, n) => makeSermonRoute(l, n.id)}
			parseEntryTitle={(n) => n.title}
			parseEntryImageUrl={(n) => n.imageWithFallback?.url}
			pagination={pagination}
		>
			<RssLink href={rssPath} />
			<div>{data?.person?.summary}</div>
			<div
				dangerouslySetInnerHTML={{ __html: data?.person?.description || '' }}
			/>
		</PaginatedList>
	);
}

export default withFailStates(
	PresenterRecordings,
	({ nodes }) => !nodes.length
);
