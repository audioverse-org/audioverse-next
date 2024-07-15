import React from 'react';
import { FormattedMessage } from 'react-intl';

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
			label={
				<FormattedMessage
					id="cardSermon_sequenceLabel"
					defaultMessage="Series"
				/>
			}
			url={sequence.canonicalPath}
			icon={<HatIcon />}
			fullBleed={fullBleed}
		/>
	);
}
