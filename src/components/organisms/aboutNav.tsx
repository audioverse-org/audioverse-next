import React from 'react';

import Mininav from '@components/molecules/mininav';
import { useNavigationItems } from '@lib/useNavigationItems';

import styles from './aboutNav.module.scss';

type Props = {
	current: string;
};

export default function AboutNav({ current }: Props): JSX.Element {
	const item = useNavigationItems().find(({ key }) => key === 'story');
	return (
		<div className={styles.wrapper}>
			<Mininav
				items={(item?.children || []).map(({ label, href, key }) => ({
					id: label,
					label,
					url: href as string,
					isActive: current === key,
				}))}
			/>
		</div>
	);
}
