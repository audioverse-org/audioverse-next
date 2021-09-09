import React from 'react';

import { BaseColors } from '@components/atoms/baseColors';
import Heading6 from '@components/atoms/heading6';

import baseColorStyles from '../atoms/baseColors.module.scss';

import styles from './typeLockup.module.scss';

type Props = {
	Icon: React.ElementType;
	label: string | JSX.Element;
	iconColor: BaseColors.RED | BaseColors.SALMON;
	textColor:
		| BaseColors.DARK
		| BaseColors.MID_TONE
		| BaseColors.LIGHT_TONE
		| BaseColors.WHITE;
};

export default function TypeLockup({
	Icon,
	label,
	iconColor,
	textColor,
}: Props): JSX.Element {
	return (
		<div className={styles.container}>
			<Icon className={baseColorStyles[iconColor]} />
			<Heading6
				sans
				loose
				unpadded
				uppercase
				className={baseColorStyles[textColor]}
			>
				{label}
			</Heading6>
		</div>
	);
}
