import clsx from 'clsx';
import React from 'react';

import Heading6 from '~components/atoms/heading6';
import { BaseColors } from '~lib/constants';

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
	unpadded?: boolean;
};

export default function TypeLockup({
	Icon,
	label,
	iconColor,
	textColor,
	unpadded,
}: Props): JSX.Element {
	return (
		<div className={clsx(styles.container, unpadded && styles.unpadded)}>
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
