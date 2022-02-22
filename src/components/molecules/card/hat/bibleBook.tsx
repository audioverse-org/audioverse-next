import React from 'react';

import Heading2 from '@components/atoms/heading2';
import { CardRecordingFragment } from '@lib/generated/graphql';

import HatIcon from '../../../../../public/img/fa-book-light.svg';
import CardRecordingSequenceHat from '../recordingSequenceHat';

import styles from './bibleBook.module.scss';

import CardHat from '.';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
}

export default function CardHatBibleBook({ sequence }: Props): JSX.Element {
	return (
		<CardHat
			title={sequence.title}
			label={
				sequence.collection?.title.includes('New') ? 'NKJV Bible' : 'KJV Bible'
			}
			url={sequence.canonicalPath}
			icon={<HatIcon />}
			longHat
		>
			<CardRecordingSequenceHat sequence={sequence} inverse>
				<Heading2 className={styles.heading}>{sequence.title}</Heading2>
			</CardRecordingSequenceHat>
		</CardHat>
	);
}
