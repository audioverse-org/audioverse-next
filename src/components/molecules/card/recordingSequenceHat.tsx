import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import { setSequenceFavorited } from '@lib/api/setSequenceFavorited';
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

const getSequenceLabel = (contentType: SequenceContentType) => {
	switch (contentType) {
		case SequenceContentType.Audiobook:
			return (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__addBook"
					defaultMessage="Add Book"
				/>
			);
		case SequenceContentType.MusicAlbum:
			return (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__addAlbum"
					defaultMessage="Add Album"
				/>
			);
		case SequenceContentType.Series:
			return (
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__addSeries"
					defaultMessage="Add Series"
				/>
			);
		case SequenceContentType.StorySeason:
			return (
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
						setSequenceFavorited(sequence.id, true);
					}}
					text={getSequenceLabel(sequence.contentType)}
					IconLeft={IconLike}
					className={styles.addAllButton}
				/>
				<FormattedMessage
					id="molecule-cardRecordingSequenceHat__inLibrary"
					defaultMessage="{inLibraryCount} out of {totalCount} in your library"
					values={{
						inLibraryCount: sequence.favoritedRecordings.aggregate?.count || 0,
						totalCount: sequence.recordings.aggregate?.count || 0,
					}}
				/>
			</div>
		</div>
	);
}
