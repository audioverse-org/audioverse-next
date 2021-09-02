import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import TableList from '@components/organisms/tableList';
import { RecordingListFragment } from '@lib/generated/graphql';
import { makeSermonRoute } from '@lib/routes';
import { useFormattedDuration } from '@lib/time';

import PersonLockup from './personLockup';

const columns = [
	{
		name: 'speakers',
		View: function View({ node }: { node: RecordingListFragment }) {
			return (
				<ul>
					{node.persons?.map(
						(p): JSX.Element => (
							<li key={p.canonicalPath}>
								<PersonLockup person={p} textColor={BaseColors.DARK} isLinked />
							</li>
						)
					)}
				</ul>
			);
		},
	},
	{
		name: 'duration',
		View: function View({ node }: { node: RecordingListFragment }) {
			return <>{useFormattedDuration(node.duration)}</>;
		},
	},
	{
		name: 'format',
		View: function View({ node }: { node: RecordingListFragment }) {
			return node.hasVideo ? (
				<FormattedMessage
					id="recordingList__videoLabel"
					defaultMessage="Video"
					description="Recording list entry video label"
				/>
			) : (
				<FormattedMessage
					id="recordingList__audioLabel"
					defaultMessage="Audio"
					description="Recording list entry audio label"
				/>
			);
		},
	},
];

interface RecordingListProps {
	recordings: RecordingListFragment[];
	makeRoute?: (languageRoute: string, entityId: string) => string;
}

// TODO: delete/rework this component
export default function RecordingList({
	recordings,
	makeRoute = makeSermonRoute,
}: RecordingListProps): JSX.Element {
	return (
		<TableList
			nodes={recordings}
			parseTitle={(n) => n.title}
			parseImageUrl={(n) => n.imageWithFallback?.url}
			makeEntryRoute={(languageRoute, node) =>
				makeRoute(languageRoute, node.id)
			}
			columns={columns}
		/>
	);
}
