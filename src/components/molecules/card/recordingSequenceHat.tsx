import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import { CardWithPlayableFragment } from '@lib/generated/graphql';

import IconLike from '../../../../public/img/icon-like-light.svg';
import Button from '../button';

import styles from './recordingSequenceHat.module.scss';

interface Props {
	sequence: NonNullable<CardWithPlayableFragment['sequence']>;
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
			onClick={() => router.push(sequence.canonicalPath)}
		>
			{children}
			<div className={styles.row}>
				<Button
					type={inverse ? 'primaryInverse' : 'primary'}
					onClick={(e) => {
						e.stopPropagation();
						alert('TODO');
					}}
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
						inLibraryCount: 3, // TODO
						totalCount: sequence.recordings.aggregate?.count || 0,
					}}
				/>
			</div>
		</div>
	);
}
