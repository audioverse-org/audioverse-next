import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import Link from '~/components/atoms/linkWithoutPrefetch';
import BibleVersionTypeLockup from '~components/molecules/bibleVersionTypeLockup';
import Dropdown, { Trigger } from '~components/molecules/dropdown';

import { BibleVersionTophatFragment } from './__generated__';
import { getBibleAcronym } from './getBibleAcronym';
import styles from './index.module.scss';

interface Props {
	version: BibleVersionTophatFragment;
	versions: BibleVersionTophatFragment[];
	label: string;
	getVersionUrl: (version: BibleVersionTophatFragment) => string;
	/**
	 * Optional URL to navigate to when clicking on the hat area.
	 * If not provided, the hat area will not be clickable.
	 */
	hatUrl?: string;
}

export default function BibleVersionTophat({
	version,
	versions,
	label,
	getVersionUrl,
	hatUrl,
}: Props): JSX.Element {
	const router = useRouter();

	const handleHatClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!hatUrl) return;

		const t = e.target as HTMLElement;
		const isVersionSelector = t.closest(`.${styles.versionSelectorBtn}`);

		if (isVersionSelector) return;

		router.push(hatUrl);
	};

	const trigger = useCallback<Trigger>(
		({ onClick, 'aria-controls': ariaControls }) => (
			<button
				onClick={onClick}
				aria-controls={ariaControls}
				className={styles.versionSelectorBtn}
			>
				{getBibleAcronym(version.title)}
				<span className={styles.dropdownArrow}>▼</span>
			</button>
		),
		[version.title],
	);

	return (
		<div className={styles.base}>
			<div
				className={styles.hat}
				onClick={handleHatClick}
				style={{ cursor: hatUrl ? 'pointer' : 'default' }}
			>
				<div className={styles.hatLeft}>
					<BibleVersionTypeLockup unpadded label={label} />
				</div>
				<div className={styles.hatRight}>
					<Dropdown id="version-selector" trigger={trigger}>
						{() => (
							<ul className={styles.versionDropdownList}>
								{versions.map((v) => (
									<li key={v.id}>
										<Link href={getVersionUrl(v)}>{v.title}</Link>
									</li>
								))}
							</ul>
						)}
					</Dropdown>
				</div>
			</div>
		</div>
	);
}
