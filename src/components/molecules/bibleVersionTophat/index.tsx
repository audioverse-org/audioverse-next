import React from 'react';

import BibleVersionTypeLockup from '~components/molecules/bibleVersionTypeLockup';
import Dropdown from '~components/molecules/dropdown';

import { BibleVersionTophatFragment } from './__generated__';
import { getBibleAcronym } from './getBibleAcronym';
import styles from './index.module.scss';

interface Props {
	version: BibleVersionTophatFragment;
	versions: BibleVersionTophatFragment[];
	label: string;
	getVersionUrl: (version: BibleVersionTophatFragment) => string;
}

export default function BibleVersionTophat({
	version,
	versions,
	label,
	getVersionUrl,
}: Props): JSX.Element {
	return (
		<div className={styles.base}>
			<div className={styles.hat}>
				<div className={styles.hatLeft}>
					<BibleVersionTypeLockup unpadded label={label} />
				</div>
				<div className={styles.hatRight}>
					<Dropdown
						id="version-selector"
						trigger={({ onClick, 'aria-controls': ariaControls }) => (
							<button
								onClick={onClick}
								aria-controls={ariaControls}
								className={styles.versionSelectorBtn}
							>
								{getBibleAcronym(version.title)}
								<span className={styles.dropdownArrow}>▼</span>
							</button>
						)}
					>
						{() => (
							<ul className={styles.versionDropdownList}>
								{versions.map((v) => (
									<li key={v.id}>
										<a href={getVersionUrl(v)}>{v.title}</a>
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
