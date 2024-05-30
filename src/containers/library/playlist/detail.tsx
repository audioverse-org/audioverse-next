import router from 'next/router';
import React, { useState } from 'react';
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
import { BaseColors } from '~lib/constants';
import { formatLongDateTime } from '~lib/date';
import ButtonShare from '~src/components/molecules/buttonShare';
import IconButton from '~src/components/molecules/iconButton';
import PlaylistTypeLockup from '~src/components/molecules/playlistTypeLockup';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';
import { Must } from '~src/types/types';

import EditIcon from '../../../../public/img/icons/edit-light.svg';
import ShareIcon from '../../../../public/img/icons/share-alt-light.svg';
import Modal from '../../../components/organisms/modal';
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
	const { title, recordings, createdAt, summary, id } = playlist;
	const languageRoute = useLanguageRoute();

	const [isNotShareableOpen, setIsNotShareableOpen] = useState(false);

	const edit = () =>
		router.push({
			pathname: `/${languageRoute}/playlists/edit`,
			query: {
				id: playlist.id,
				isPublic: playlist.isPublic,
				summary: playlist.summary,
				title: playlist.title,
			},
		});

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
				<PlaylistTypeLockup />

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
					{!playlist.isPublic ? (
						<IconButton
							Icon={ShareIcon}
							color={BaseColors.DARK}
							onClick={(e) => {
								e.preventDefault();
								setIsNotShareableOpen(true);
							}}
							backgroundColor={BaseColors.CREAM}
						/>
					) : (
						<ButtonShare
							shareUrl={`https://audioverse.org/${languageRoute}/playlists/${playlist.id}`}
							backgroundColor={BaseColors.CREAM}
							light={true}
						/>
					)}

					<IconButton
						Icon={EditIcon}
						color={BaseColors.DARK}
						onClick={(e) => {
							e.preventDefault();
							edit();
						}}
						backgroundColor={BaseColors.CREAM}
					/>
				</div>
				<HorizontalRule color={BaseColors.LIGHT_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</ContentWidthLimiter>
			{recordings.nodes?.length ? (
				<CardGroup className={styles.cardGroup}>
					{recordings.nodes.map((recording) => (
						<CardPlaylistItem
							recording={{
								...recording,
								canonicalPath: root
									.lang(languageRoute)
									.playlists.playlist(id)
									.items(recording.canonicalPath)
									.get(),
							}}
							key={recording.id}
						/>
					))}
				</CardGroup>
			) : null}

			<Modal
				open={isNotShareableOpen}
				onClose={() => setIsNotShareableOpen(false)}
				title={
					<FormattedMessage id="not_shareable_title" defaultMessage="PRIVATE" />
				}
			>
				<FormattedMessage
					id="not_shareable"
					defaultMessage="This Playlist is Private. Only SHAREABLE Playlists can be shared."
				/>
			</Modal>
		</Tease>
	);
}

export default withFailStates(LibraryPlaylistDetail, {
	useShould404: ({ playlist }) => !playlist,
});
