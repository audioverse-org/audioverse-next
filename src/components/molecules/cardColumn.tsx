import React from 'react';

import styles from './cardColumn.module.scss';

interface CardColumnProps {
	items: React.ReactElement[];
	className?: string;
}

export default function CardColumn({
	items,
	className,
}: CardColumnProps): JSX.Element {
	return (
		<div className={`${styles.container}${className ? ` ${className}` : ''}`}>
			{items}
		</div>
	);
}
