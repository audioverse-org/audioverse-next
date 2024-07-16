import React from 'react';

import HatIcon from '~public/img/icons/fa-feather-light.svg';

import { CardRecordingFragment } from '../__generated__/recording';
import CardHat from '.';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
}

export default function CardHatStory({ sequence }: Props): JSX.Element {
	return (
		<CardHat
			title={sequence.title}
			url={sequence.canonicalPath}
			icon={<HatIcon />}
		/>
	);
}
