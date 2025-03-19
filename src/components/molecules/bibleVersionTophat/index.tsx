import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import Link from '~/components/atoms/linkWithoutPrefetch';
import BibleVersionTypeLockup from '~components/molecules/bibleVersionTypeLockup';
import Dropdown, { Trigger } from '~components/molecules/dropdown';

import { BibleVersionTophatFragment } from './__generated__';
import { getBibleAcronym } from './getBibleAcronym';
import styles from './index.module.scss';
import useChapterAvailability from './useChapterAvailability';

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
	bookName?: string;
	chapterNumber?: number;
}

export default function BibleVersionTophat({
	version,
	versions,
	label,
	getVersionUrl,
	hatUrl,
	bookName,
	chapterNumber,
}: Props): JSX.Element {
	const router = useRouter();
	const intl = useIntl();
	const availability = useChapterAvailability(bookName, chapterNumber);

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
						{(handleClose) => (
							<ul className={styles.versionDropdownList}>
								{versions.map((v) => {
									const disabled = availability ? !availability?.[v.id] : false;
									return (
										<li key={v.id} className={disabled ? styles.disabled : ''}>
											{!disabled ? (
												<Link href={getVersionUrl(v)} onClick={handleClose}>
													{v.title}
												</Link>
											) : (
												<span
													className={styles.disabledLink}
													title={intl.formatMessage({
														id: 'molecule-bibleVersionTophat__disabledTooltip',
														defaultMessage:
															'The displayed chapter is unavailable in this version',
													})}
												>
													{v.title}
												</span>
											)}
										</li>
									);
								})}
							</ul>
						)}
					</Dropdown>
				</div>
			</div>
		</div>
	);
}
