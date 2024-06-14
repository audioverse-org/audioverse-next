import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
import Loader from '~src/components/atoms/Loader';
import ButtonShare from '~src/components/molecules/buttonShare';
import IconButton from '~src/components/molecules/iconButton';
import PlaylistTypeLockup from '~src/components/molecules/playlistTypeLockup';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';
import { Must } from '~src/types/types';

import ShareIcon from '../../../../public/img/icons/share-alt-light.svg';
import EditPlaylist from '../../../../src/pages/[language]/library/playlists/edit';
import Modal from '../../../components/organisms/modal';
import {
	getLibraryPlaylistPageData,
	GetLibraryPlaylistPageDataQuery,
} from './__generated__/detail';
import styles from './detail.module.scss';

export type ILibraryPlaylistDetailProps = {
	playlist: NonNullable<
		GetLibraryPlaylistPageDataQuery['me']
	>['user']['playlist'];
};

function LibraryPlaylistDetail({
	playlist,
}: Must<ILibraryPlaylistDetailProps>): JSX.Element {
	const [currentPlaylist, setCurrentPlaylist] = useState<
		ILibraryPlaylistDetailProps['playlist'] | null
	>(playlist);
	const [isNotShareableOpen, setIsNotShareableOpen] = useState(false);
	const router = useRouter();
	const languageRoute = useLanguageRoute();

	const fetchPlaylist = async (id: string) => {
		try {
			const { me } = id
				? await getLibraryPlaylistPageData({
						id: id,
				  }).catch(() => ({
						me: null,
				  }))
				: { me: null };

			setCurrentPlaylist(me?.user?.playlist || null);
		} catch (err) {
			console.error('Error loading playlist:', err);
		}
	};

	useEffect(() => {
		if (router.query.id) {
			fetchPlaylist(router.query.id as string);
		}
	}, [router.query.id]);

	if (!currentPlaylist) {
		return <Loader />;
	}

	const { title, recordings, createdAt, summary } = currentPlaylist;

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
					{!currentPlaylist.isPublic ? (
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
							shareUrl={`https://audioverse.org/${currentPlaylist.language}/playlists/${currentPlaylist.id}`}
							backgroundColor={BaseColors.CREAM}
							light={true}
						/>
					)}
					{!(router.route === '/[language]/playlists/[playlist]') && (
						<EditPlaylist
							id={currentPlaylist.id}
							title={currentPlaylist.title}
							summary={currentPlaylist.summary}
							isPublic={currentPlaylist.isPublic}
							onEditSuccess={() => fetchPlaylist(currentPlaylist.id + '')} // Fetch playlist on edit success
						/>
					)}
				</div>
				<HorizontalRule color={BaseColors.LIGHT_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.DARK} />
			</ContentWidthLimiter>
			{recordings.nodes?.length ? (
				<CardGroup className={styles.cardGroup}>
					{recordings.nodes?.map((recording) => (
						<CardPlaylistItem
							recording={{
								...recording,
								canonicalPath: root
									.lang(languageRoute)
									.playlists.playlist(currentPlaylist.id)
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
