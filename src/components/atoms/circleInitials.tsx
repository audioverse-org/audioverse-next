import clsx from 'clsx';
import React from 'react';

import styles from './circleInitials.module.scss';

interface CircleInitialsProps {
	name: string;
}

const CircleInitials: React.FC<CircleInitialsProps> = ({ name }) => {
	// Split the name into first and last names
	const [firstName, lastName] = name.split(' ');

	// Get the first letters of the first and last names
	const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : '';
	const lastLetter = lastName ? lastName.charAt(0).toUpperCase() : '';

	return (
		<div className={clsx(styles.circle)}>
			<div className={clsx(styles.initial)}>{firstLetter}</div>
			<div className={clsx(styles.initial)}>{lastLetter}</div>
		</div>
	);
};

export default CircleInitials;
