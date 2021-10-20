import { useRouter } from 'next/router';
import React from 'react';

import Mininav from '@components/molecules/mininav';
import { getNavigationItems, INavigationItem } from '@lib/getNavigationItems';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './aboutNav.module.scss';

type Props = {
	current: string;
};

export default function AboutNav({ current }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	const router = useRouter();
	const item = getNavigationItems(router, languageRoute).find(
		({ key }) => key === 'story'
	) as INavigationItem;
	return (
		<div className={styles.wrapper}>
			<Mininav
				items={(item.children as INavigationItem[]).map(
					({ label, href, key }) => ({
						label,
						url: href as string,
						isActive: current === key,
					})
				)}
			/>
		</div>
	);
}
