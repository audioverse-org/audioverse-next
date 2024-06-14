import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '~src/lib/constants';
import { getSessionToken } from '~src/lib/cookies';
import useLanguageRoute from '~src/lib/useLanguageRoute';
import NewPlaylist from '~src/pages/[language]/library/playlists/new';

import AddToPlaylistIcon from '../../../public/img/icons/in-queue.svg';
import AddToPlaylistIconLight from '../../../public/img/icons/in-queue-light.svg';
import AddToPlaylist from '../../pages/[language]/library/playlists/addToPlaylist/AddToPlaylist';
import Modal from '../organisms/modal';
import { GlobalModalsContext } from '../templates/andGlobalModals';
import Button from './button';
import styles from './buttonAddToPlaylist.module.scss';
import IconButton from './iconButton';

type ButtonAddToPlaylistProps = {
	recordingId: string | number;
	backgroundColor: BaseColors;
	iconColor: BaseColors;
	iconLight?: boolean;
};

const ButtonAddToPlaylist: React.FC<ButtonAddToPlaylistProps> = ({
	recordingId,
	backgroundColor,
	iconColor,
	iconLight,
}) => {
	const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
	const [isPlaylistModalNewOpen, setIsPlaylistModalNewOpen] = useState(false);
	const intl = useIntl();
	const language = useLanguageRoute();
	const context = useContext(GlobalModalsContext);
	const label = intl.formatMessage({
		id: 'add_to_playlist_btn',
		defaultMessage: 'Add to playlist',
		description: 'Add to Playlist button label',
	});

	const handleCloseNewModal = () => {
		setIsPlaylistModalNewOpen(false);
	};

	return (
		<>
			<IconButton
				Icon={iconLight ? AddToPlaylistIconLight : AddToPlaylistIcon}
				onClick={() => {
					const isLoggedOut = !getSessionToken();
					if (isLoggedOut) {
						return context.challengeAuth(() => setIsPlaylistModalOpen(true));
					}
					setIsPlaylistModalOpen(true);
				}}
				backgroundColor={backgroundColor}
				className={styles.add}
				color={iconColor}
				aria-label={label}
			/>
			<Modal
				open={isPlaylistModalOpen}
				onClose={() => setIsPlaylistModalOpen(false)}
				title={
					<FormattedMessage
						id="add_to_playlist"
						defaultMessage="Add To Playlist"
					/>
				}
				rightElmt={
					<Button
						onClick={() => {
							setIsPlaylistModalNewOpen(true);
						}}
						className={styles.modalLink}
						text={
							<FormattedMessage id="create_new" defaultMessage="Create New" />
						}
						type="tertiary"
					/>
				}
				hideClose
			>
				<AddToPlaylist language={language} recId={recordingId} />
			</Modal>
			<Modal
				open={isPlaylistModalNewOpen}
				onClose={handleCloseNewModal}
				title={
					<FormattedMessage id="new_playlist" defaultMessage="New playlist" />
				}
				titleLeft
				hideClose
			>
				<NewPlaylist id={recordingId} onClose={handleCloseNewModal} />
			</Modal>
		</>
	);
};

export default ButtonAddToPlaylist;
