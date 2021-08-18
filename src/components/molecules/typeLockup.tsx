import React from 'react';

import Heading6 from '@components/atoms/heading6';

import styles from './typeLockup.module.scss';

// TODO: move to global named colors

type Props = {
	Icon: React.ElementType;
	label: string;
	iconColor: 'red' | 'salmon';
	textColor: 'dark' | 'white';
};

export default function TypeLockup({
	Icon,
	label,
	iconColor,
	textColor,
}: Props): JSX.Element {
	return (
		<div className={styles.container}>
			<Icon className={iconColor === 'salmon' ? styles.salmon : styles.red} />
			<Heading6
				sans
				loose
				unpadded
				uppercase
				className={textColor === 'white' ? styles.white : styles.dark}
			>
				{label}
			</Heading6>
		</div>
	);
}
