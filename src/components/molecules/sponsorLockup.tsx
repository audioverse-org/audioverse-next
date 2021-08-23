import clsx from 'clsx';
import React from 'react';

import { BaseColors } from '@components/atoms/baseColors';
import RoundImage from '@components/atoms/roundImage';
import { SponsorLockupFragment } from '@lib/generated/graphql';

import baseColorStyles from '../atoms/baseColors.module.scss';

import styles from './sponsorLockup.module.scss';

type Props = {
	sponsor: SponsorLockupFragment;
	textColor: BaseColors.DARK | BaseColors.WHITE | BaseColors.LIGHT_TONE;
};

export default function SponsorLockup({
	sponsor: { title, imageWithFallback },
	textColor,
}: Props): JSX.Element {
	return (
		<div className={styles.container}>
			<RoundImage image={imageWithFallback.url} small />
			<div className={clsx(styles.title, baseColorStyles[textColor])}>
				{title}
			</div>
		</div>
	);
}
