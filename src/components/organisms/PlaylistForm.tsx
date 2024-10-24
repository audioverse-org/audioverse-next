import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { UserPlaylist, UserPlaylistAddInput } from '~src/__generated__/graphql';
import Button from '~src/components/molecules/button';
import Input from '~src/components/molecules/form/input';
import { BaseColors } from '~src/lib/constants';

import ClosureIcon from '../../../public/img/icons/closure-light.svg';
import DisclosureIcon from '../../../public/img/icons/disclosure-light.svg';
import ShareableIcon from '../../../public/img/icons/linked-light.svg';
import PrivateIcon from '../../../public/img/icons/private-light.svg';
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

	return (
		<div>
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
			<button
				className={styles.privacyButton}
				onClick={() => {
					setIsPrivacyVisible(!isPrivacyVisible);
				}}
			>
				<div className={styles.privacyInputLeft}>
					{!isPublic ? (
						<PrivateIcon color={BaseColors.DARK} />
					) : (
						<ShareableIcon color={BaseColors.DARK} />
					)}
					<p className={styles.privacyInputLeftLabel}>
						{!isPublic ? (
							<FormattedMessage id="newPrivate" defaultMessage="Private" />
						) : (
							<FormattedMessage id="newShareable" defaultMessage="Shareable" />
						)}
					</p>
				</div>
				<div className={styles.privacyInputRightIcon}>
					{!isPrivacyVisible ? (
						<DisclosureIcon color={BaseColors.DARK} />
					) : (
						<ClosureIcon color={BaseColors.DARK} />
					)}
				</div>
			</button>
			{isPrivacyVisible && (
				<div className={styles.privacyContainer}>
					<button
						className={styles.privacyOption}
						onClick={() => {
							setPrivacy(false);
						}}
					>
						<PrivateIcon color={BaseColors.DARK} />
						<div className={styles.privacyOptionRight}>
							<FormattedMessage id="newPrivate" defaultMessage="Private" />
							<p className={styles.privacyOptionSubtitle}>
								<FormattedMessage
									id="onlyYou"
									defaultMessage="Only you can view"
								/>
							</p>
						</div>
					</button>
					<button
						className={styles.privacyOption}
						onClick={() => {
							setPrivacy(true);
						}}
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
					</button>
				</div>
			)}
			<div className={styles.footer}>
				<Button
					text={
						!id
							? intl.formatMessage({
									id: 'create',
									defaultMessage: 'Create',
								})
							: intl.formatMessage({
									id: 'done',
									defaultMessage: 'Done',
								})
					}
					type="primary"
					onClick={submit}
					disabled={loading}
				/>
				<Button
					text={intl.formatMessage({
						id: 'molecule-searchBar__cancel',
						defaultMessage: 'Cancel',
					})}
					type="tertiary"
					onClick={onCancel}
					disabled={loading}
					className={styles.cancel}
				/>
			</div>
		</div>
	);
}
