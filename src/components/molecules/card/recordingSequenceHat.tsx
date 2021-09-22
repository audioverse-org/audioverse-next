import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import { setSequenceFavorited } from '@lib/api/setSequenceFavorited';
import { CardRecordingSequenceHatFragment } from '@lib/generated/graphql';

import IconLike from '../../../../public/img/icon-like-light.svg';
import Button from '../button';

import styles from './recordingSequenceHat.module.scss';

interface Props {
	sequence: NonNullable<CardRecordingSequenceHatFragment['sequence']>;
	inverse?: boolean;
}

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
					onClick={() => setSequenceFavorited(sequence.id, true)}
					text={
						<FormattedMessage
							id="molecule-cardRecordingSequenceHat__addAll"
							defaultMessage="Add All"
						/>
					}
					Icon={IconLike}
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
