import React from 'react';

import HatIcon from '~public/img/icons/fa-list-alt.svg';

import { CardRecordingFragment } from '../__generated__/recording';
import CardHat from '.';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
	fullBleed?: boolean;
}

export default function CardHatSermon({
	sequence,
	fullBleed,
}: Props): JSX.Element {
	return (
		<CardHat
			title={sequence.title}
			url={sequence.canonicalPath}
			icon={<HatIcon />}
			fullBleed={fullBleed}
		/>
	);
}
