import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import HorizontalRule from '~components/atoms/horizontalRule';
import withFailStates from '~components/HOCs/withFailStates';
import CardPlaylistItem from '~components/molecules/card/playlistItem';
import CardGroup from '~components/molecules/cardGroup';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '~components/molecules/definitionList';
import Tease from '~components/molecules/tease';
import TypeLockup from '~components/molecules/typeLockup';
import { BaseColors } from '~lib/constants';
import { formatLongDateTime } from '~lib/date';
import ListIcon from '~public/img/icons/fa-list.svg';
import { Must } from '~src/types/types';

import { GetLibraryPlaylistPageDataQuery } from './__generated__/detail';
import styles from './detail.module.scss';

export type ILibraryPlaylistDetailProps = {
	playlist: NonNullable<
		GetLibraryPlaylistPageDataQuery['me']
	>['user']['playlist'];
};

function LibraryPlaylistDetail({
	playlist,
}: Must<ILibraryPlaylistDetailProps>): JSX.Element {
	const { title, recordings, createdAt, summary } = playlist;

	const details: IDefinitionListTerm[] = [];
	if (summary) {
		details.push({
			term: (
				<FormattedMessage
					id="playlistDetail__descriptionLabel"
					defaultMessage="Description"
				/>
			),
			definition: <div>{summary}</div>,
		});
	}

	if (createdAt) {
		details.push({
			term: (
				<FormattedMessage
					id="playlistDetail__createdLabel"
					defaultMessage="Created"
				/>
			),
			definition: <p>{formatLongDateTime(createdAt)}</p>,
		});
	}

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<TypeLockup
					Icon={ListIcon}
					label={
						<FormattedMessage
							id="playlistDetail__type"
							defaultMessage="Playlist"
						/>
					}
					iconColor={BaseColors.SALMON}
					textColor={BaseColors.DARK}
				/>

				<Heading2 className={styles.title}>{title}</Heading2>
				<div className={styles.row}>
					<Heading6 sans loose uppercase unpadded className={styles.countLabel}>
						<FormattedMessage
							id="playlistDetail__partsCountLabel"
							defaultMessage="{count} Teachings"
							description="Playlist Detail teachings count label"
							values={{ count: recordings.aggregate?.count }}
						/>
					</Heading6>
				</div>
				<HorizontalRule color={BaseColors.LIGHT_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</ContentWidthLimiter>
			{recordings.nodes?.length ? (
				<CardGroup className={styles.cardGroup}>
					{recordings.nodes.map((recording) => (
						<CardPlaylistItem recording={recording} key={recording.id} />
					))}
				</CardGroup>
			) : null}
		</Tease>
	);
}

export default withFailStates(LibraryPlaylistDetail, {
	useShould404: ({ playlist }) => !playlist,
});
