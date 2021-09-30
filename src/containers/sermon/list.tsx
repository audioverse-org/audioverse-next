import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import RecordingList from '@components/molecules/recordingList';
import RssAlternate from '@components/molecules/rssAlternate';
import { GetSermonListStaticPropsQuery } from '@lib/generated/graphql';
import { makeSermonListRoute, makeSermonsFeedRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

type Sermons = NonNullable<GetSermonListStaticPropsQuery['sermons']['nodes']>;

export interface SermonListProps {
	nodes: Sermons;
	filter: string;
	pagination: {
		current: number;
		total: number;
	};
}

function SermonList({ nodes, pagination, filter }: SermonListProps) {
	const lang = useLanguageRoute();

	return (
		<div>
			<RssAlternate url={makeSermonsFeedRoute(lang)} />
			<div>
				<Link href={makeSermonListRoute(lang, 'all', 1)}>
					<a>
						<FormattedMessage
							id="container-sermonList__filterLabelAll"
							defaultMessage="All"
							description="sermon list page filter all"
						/>
					</a>
				</Link>
				<Link href={makeSermonListRoute(lang, 'video', 1)}>
					<a>
						<FormattedMessage
							id="container-sermonList__filterLabelVideo"
							defaultMessage="Video"
							description="sermon list page filter video"
						/>
					</a>
				</Link>
				<Link href={makeSermonListRoute(lang, 'audio', 1)}>
					<a>
						<FormattedMessage
							id="container-sermonList__filterLabelAudio"
							defaultMessage="Audio"
							description="sermon list page filter audio"
						/>
					</a>
				</Link>
			</div>
			<RecordingList recordings={nodes} />
			<Pagination
				current={pagination.current}
				total={pagination.total}
				makeRoute={(l, i) => makeSermonListRoute(l, filter, i)}
			/>
		</div>
	);
}

const should404 = (props: SermonListProps) => !props.nodes?.length;

export default withFailStates(SermonList, should404);
