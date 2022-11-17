import Link from 'next/link';
import React from 'react';

import styles from './jumpBar.module.scss';

type Props = {
	links: {
		url: string;
		text: string;
	}[];
};

export default function JumpBar({ links }: Props): JSX.Element | null {
	return (
		<div className={styles.jumpBar}>
			{links.map(({ url, text }) => (
				<Link key={text} href={url}>
					<a>{text}</a>
				</Link>
			))}
		</div>
	);
}
