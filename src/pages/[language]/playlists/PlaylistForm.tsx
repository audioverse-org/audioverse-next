import Link from 'next/link';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { UserPlaylist, UserPlaylistAddInput } from '~src/__generated__/graphql';
import Heading2 from '~src/components/atoms/heading2';
import Button from '~src/components/molecules/button';
import Input from '~src/components/molecules/form/input';
import { BaseColors } from '~src/lib/constants';

import ClosureIcon from '../../../../public/img/icons/closure-light.svg';
import DisclosureIcon from '../../../../public/img/icons/disclosure-light.svg';
import ShareableIcon from '../../../../public/img/icons/linked-light.svg';
import PrivateIcon from '../../../../public/img/icons/private-light.svg';
import styles from './Playlistform.module.scss';

export type PlaylistProps = Pick<
	UserPlaylistAddInput,
	'isPublic' | 'summary' | 'title'
>;

type Props = Partial<Pick<UserPlaylist, 'id'>> &
	Partial<PlaylistProps> & {
		onSubmit: (data: PlaylistProps) => Promise<void>;
		onCancel: (() => void) | undefined;
		onDelete?: () => Promise<void>;
	};

export default function PlaylistForm({
	id,
	title: playlistTitle,
	summary,
	isPublic: playlistIsPublic,
	onSubmit,
	onCancel,
	onDelete,
}: Props): JSX.Element {
	const [title, setTitle] = useState<string>(playlistTitle || '');
	const [description, setDescription] = useState<string>(summary || '');
	const [isPrivacyVisible, setIsPrivacyVisible] = useState<boolean>(false);
	const [isPublic, setIsPublic] = useState<boolean>(playlistIsPublic || false);
	const [loading, setLoading] = useState<boolean>(false);
	const intl = useIntl();
	const setPrivacy = (isPublic: boolean) => {
		setIsPublic(isPublic);
		setIsPrivacyVisible(!isPrivacyVisible);
	};

	const submit = async () => {
		if (!title) {
			return;
		}
		setLoading(true);
		try {
			await onSubmit({ isPublic, title, summary: description || null });
		} catch {
			setLoading(false);
		}
	};

	const deletePlaylist = async () => {
		setLoading(true);
		onDelete && (await onDelete());
	};

	return (
		<div>
			{id && (
				<div style={{ textAlign: 'right' }}>
					<Link href="#" legacyBehavior>
						<a onClick={deletePlaylist}>
							<FormattedMessage
								id="deletePlaylists"
								defaultMessage="Delete Playlist"
							/>
						</a>
					</Link>
				</div>
			)}
			{id && (
				<Heading2>
					<FormattedMessage id="editPlayLists" defaultMessage="Edit playlist" />
				</Heading2>
			)}

			<Input
				label={intl.formatMessage({
					id: 'pl_title',
					defaultMessage: 'Title',
				})}
				value={title}
				setValue={setTitle}
				placeholder="Spiritual Lessons"
			/>
			<Input
				label={intl.formatMessage({
					id: 'pl_description',
					defaultMessage: 'Description',
				})}
				value={description}
				setValue={setDescription}
				placeholder="Things I’ve learned lately"
			/>
			<div className={styles.privacyLabel}>
				<FormattedMessage id="newPrivacy" defaultMessage="Privacy" />
			</div>
			<Link href="#" onClick={() => setIsPrivacyVisible(!isPrivacyVisible)}>
				<div className={styles.privacyInputLeft}>
					{!isPublic ? (
						<PrivateIcon color={BaseColors.DARK} />
					) : (
						<ShareableIcon color={BaseColors.DARK} />
					)}
					<p className={styles.privacyInputLeftLabel}>
						{!isPublic ? 'Private' : 'Shareable'}
					</p>
				</div>
				{!isPrivacyVisible ? (
					<DisclosureIcon color={BaseColors.DARK} />
				) : (
					<ClosureIcon color={BaseColors.DARK} />
				)}
			</Link>
			{isPrivacyVisible && (
				<div className={styles.privacyContainer}>
					<Link
						className={styles.privacyOption}
						href="#"
						onClick={() => setPrivacy(false)}
					>
						<PrivateIcon color={BaseColors.DARK} />
						<div className={styles.privacyOptionRight}>
							<FormattedMessage id="newPrivate" defaultMessage="Private" />
							<p className={styles.privacyOptionSubtitle}>
								<FormattedMessage
									id="onlyYow"
									defaultMessage="Only you can view"
								/>
							</p>
						</div>
					</Link>
					<Link
						className={styles.privacyOption}
						href="#"
						onClick={() => setPrivacy(true)}
					>
						<ShareableIcon color={BaseColors.DARK} />
						<div className={styles.privacyOptionRight}>
							<FormattedMessage id="newShareable" defaultMessage="Shareable" />
							<p className={styles.privacyOptionSubtitle}>
								<FormattedMessage
									id="anyoneWithLink"
									defaultMessage="Anyone with the link can view"
								/>
							</p>
						</div>
					</Link>
				</div>
			)}
			<div className={styles.footer}>
				<Button
					text={!id ? 'Create' : 'Done'}
					type={!id ? 'primary' : 'primaryInverse'}
					onClick={submit}
					disabled={loading}
				/>
				<Button
					text="Cancel"
					type="secondary"
					onClick={onCancel}
					disabled={loading}
					className={styles.cancel}
				/>
			</div>
		</div>
	);
}
