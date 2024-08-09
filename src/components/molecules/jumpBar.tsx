import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './jumpBar.module.scss';

type Props = {
	links: {
		url: string;
		text: string;
	}[];
};

export default function JumpBar({ links }: Props): JSX.Element | null {
	const router = useRouter();
	return (
		<div className={styles.jumpBar}>
			{links.map(({ url, text }) => {
				const isActive = router.asPath === url;
				return (
					<Link key={text} href={url} legacyBehavior>
						<a className={isActive ? styles.active : ''}>{text}</a>
					</Link>
				);
			})}
		</div>
	);
}
