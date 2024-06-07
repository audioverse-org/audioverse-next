import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
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

import ShareIcon from '../../../../public/img/icons/share-alt-light.svg';
import EditPlaylist from '../../../../src/pages/[language]/library/playlists/edit';
import Modal from '../../../components/organisms/modal';
import { GetLibraryPlaylistPageDataQuery } from './__generated__/detail';
import styles from './detail.module.scss';

export const PLAYLIST_PAGE_REFETCH_QUERIES = [
	'GetLibraryPlaylistPageDataQuery',
];

export type ILibraryPlaylistDetailProps = {
	playlist: NonNullable<
		GetLibraryPlaylistPageDataQuery['me']
	>['user']['playlist'];
};

function LibraryPlaylistDetail({
	playlist,
}: Must<ILibraryPlaylistDetailProps>): JSX.Element {
	const queryClient = useQueryClient();

	const refetchPlaylistData = () => {
		queryClient.refetchQueries(PLAYLIST_PAGE_REFETCH_QUERIES);
	};

	const { title, recordings, createdAt, summary, id } = playlist;

	const router = useRouter();
	const languageRoute = useLanguageRoute();
	const [isNotShareableOpen, setIsNotShareableOpen] = useState(false);

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
							shareUrl={`https://audioverse.org/${playlist.language}/playlists/${playlist.id}`}
							backgroundColor={BaseColors.CREAM}
							light={true}
						/>
					)}
					{!(router.route === '/[language]/playlists/[playlist]') && (
						<EditPlaylist
							id={playlist.id}
							title={playlist.title}
							summary={playlist.summary}
							isPublic={playlist.isPublic}
							onEdit={refetchPlaylistData}
						/>
					)}
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
					<FormattedMessage id="not_shareable_title" defaultMessage="Private" />
				}
			>
				<FormattedMessage
					id="not_shareable"
					defaultMessage="This Playlist is Private."
				/>
			</Modal>
		</Tease>
	);
}

export default withFailStates(LibraryPlaylistDetail, {
	useShould404: ({ playlist }) => !playlist,
});
