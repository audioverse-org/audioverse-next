import Image from 'next/legacy/image';
import React from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';

import styles from './header.module.scss';

const Header = (): JSX.Element => {
	const languageRoute = useLanguageRoute();
	return (
		<header className={styles.header}>
			<h1>
				<Link href={`/${languageRoute}`} legacyBehavior>
					<a className={styles.link}>
						<Image
							src="/img/logo.svg"
							/* eslint-disable-next-line @calm/react-intl/missing-formatted-message */
							alt="AudioVerse"
							width={161}
							height={23}
						/>
					</a>
				</Link>
			</h1>
		</header>
	);
};

export default Header;
