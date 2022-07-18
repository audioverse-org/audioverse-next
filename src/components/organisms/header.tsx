import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './header.module.scss';

const Header = (): JSX.Element => {
	const languageRoute = useLanguageRoute();
	return (
		<header className={styles.header}>
			<h1>
				<Link href={`/${languageRoute}`}>
					<a className={styles.link}>
						<Image
							src="/img/logo.svg"
							/* eslint-disable-next-line @calm/react-intl/missing-formatted-message */
							alt="AudioVerse"
							width={161}
							height={23}
							layout="intrinsic"
						/>
					</a>
				</Link>
			</h1>
		</header>
	);
};

export default Header;
