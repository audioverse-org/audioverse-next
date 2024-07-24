import React from 'react';

import HatIcon from '~public/img/icons/fa-book-light.svg';

import { CardRecordingFragment } from '../__generated__/recording';
import CardHat from '.';

interface Props {
	sequence: NonNullable<CardRecordingFragment['sequence']>;
}

export default function CardHatBibleBook({ sequence }: Props): JSX.Element {
	const title = sequence.collection
		? sequence.collection.title
		: sequence.title;
	return (
		<CardHat title={title} url={sequence.canonicalPath} icon={<HatIcon />} />
	);
}
