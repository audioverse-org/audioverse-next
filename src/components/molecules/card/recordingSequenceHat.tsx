import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import { useIsSequenceFavorited } from '@lib/api/useIsSequenceFavorited';
import {
	CardRecordingSequenceHatFragment,
	SequenceContentType,
} from '@lib/generated/graphql';
import { UnreachableCaseError } from '@lib/typeHelpers';

import IconLike from '../../../../public/img/icon-like-light.svg';
import Button from '../button';

import styles from './recordingSequenceHat.module.scss';

interface Props {
	sequence: NonNullable<CardRecordingSequenceHatFragment['sequence']>;
	inverse?: boolean;
}

const getSequenceLabel = (
	contentType: SequenceContentType,
	isFavorited: boolean
) => {
	switch (contentType) {
		case SequenceContentType.Audiobook:
			return isFavorited ? (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__removeBook"
					defaultMessage="Remove Book"
				/>
			) : (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__addBook"
					defaultMessage="Add Book"
				/>
			);
		case SequenceContentType.MusicAlbum:
			return isFavorited ? (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__removeAlbum"
					defaultMessage="Remove Album"
				/>
			) : (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__addAlbum"
					defaultMessage="Add Album"
				/>
			);
		case SequenceContentType.Series:
			return isFavorited ? (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__removeSeries"
					defaultMessage="Remove Series"
				/>
			) : (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__addSeries"
					defaultMessage="Add Series"
				/>
			);
		case SequenceContentType.StorySeason:
			return isFavorited ? (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__removeStoryAlbum"
					defaultMessage="Remove Album"
				/>
			) : (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__addStoryAlbum"
					defaultMessage="Add Album"
				/>
			);

		default:
			throw new UnreachableCaseError(contentType);
	}
};

export default function CardRecordingSequenceHat({
	sequence,
	children,
	inverse,
}: PropsWithChildren<Props>): JSX.Element {
	const router = useRouter();
	const { isFavorited, toggleFavorited, recordingsFavoritedCount } =
		useIsSequenceFavorited(sequence.id);

	return (
		<div
			className={styles.hatContent}
			onClick={(e) => {
				e.stopPropagation();
				router.push(sequence.canonicalPath);
			}}
		>
			{children}
			<div className={styles.row}>
				<Button
					type={inverse ? 'primaryInverse' : 'primary'}
					onClick={(e) => {
						e.stopPropagation();
						toggleFavorited();
					}}
					text={getSequenceLabel(sequence.contentType, !!isFavorited)}
					IconLeft={IconLike}
					className={styles.favoriteSequenceButton}
				/>
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__inLibrary"
					defaultMessage="{inLibraryCount} out of {totalCount} in your library"
					values={{
						inLibraryCount: recordingsFavoritedCount || 0,
						totalCount: sequence.recordings.aggregate?.count || 0,
					}}
				/>
			</div>
		</div>
	);
}
