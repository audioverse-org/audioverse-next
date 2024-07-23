import React from 'react';

import HatIcon from '~public/img/icons/fa-user-plus.svg';

import { CardRecordingFragment } from '../__generated__/recording';
import CardHat from '.';
import styles from './sponsor.module.scss';

interface Props {
	sponsor: NonNullable<CardRecordingFragment['sponsor']>;
	fullBleed?: boolean;
}

export default function CardHatSponsor({
	sponsor,
	fullBleed,
}: Props): JSX.Element {
	return (
		<div className={fullBleed ? '' : styles.wrapper}>
			<CardHat
				title={sponsor.title}
				url={sponsor.canonicalPath}
				icon={<HatIcon />}
				fullBleed={fullBleed}
			/>
		</div>
	);
}
