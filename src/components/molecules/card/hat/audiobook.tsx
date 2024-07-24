import React from 'react';

import HatIcon from '~public/img/icons/fa-book-light.svg';

import { CardRecordingFragment } from '../__generated__/recording';
import CardHat from '.';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
}

export default function CardHatAudiobook({ sequence }: Props): JSX.Element {
	return (
		<CardHat
			title={sequence.title}
			url={sequence.canonicalPath}
			icon={<HatIcon />}
		/>
	);
}
