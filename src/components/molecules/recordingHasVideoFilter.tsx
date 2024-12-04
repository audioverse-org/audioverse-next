import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Link from '~components/atoms/linkWithoutPrefetch';
import Button from '~components/molecules/button';
import Dropdown from '~components/molecules/dropdown';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import IconFilter from '~public/img/icons/icon-filter-light.svg';

import styles from './recordingHasVideoFilter.module.scss';

type Props = {
	filter: string;
	makeRoute: (
		languageRoute: string,
		filter: 'all' | 'audio' | 'video',
		page: number,
	) => string;
};

export default function RecordingHasVideoFilter({ filter, makeRoute }: Props) {
	const language = useLanguageRoute();

	return (
		<Dropdown
			id="filterMenu"
			trigger={({ isOpen, ...props }) => (
				<Button
					type="secondary"
					text={
						<FormattedMessage
							id="recordingHasVideoFilter__filter"
							defaultMessage="Filter"
						/>
					}
					IconLeft={IconFilter}
					className={clsx(isOpen && styles.buttonOpen)}
					{...props}
				/>
			)}
			alignment="right"
		>
			<div className={styles.dropdownContainer}>
				<div className={styles.segmentedControlWrapper}>
					<Link href={makeRoute(language, 'all', 1)} legacyBehavior>
						<a
							className={clsx(
								styles.segmentedControl,
								filter === 'all' && styles.segmentedControlActive,
							)}
						>
							<FormattedMessage
								id="recordingHasVideoFilter__filterAll"
								defaultMessage="All"
								description="recording has video filter all"
							/>
						</a>
					</Link>
					<Link href={makeRoute(language, 'video', 1)} legacyBehavior>
						<a
							className={clsx(
								styles.segmentedControl,
								filter === 'video' && styles.segmentedControlActive,
							)}
						>
							<FormattedMessage
								id="recordingHasVideoFilter__filterVideo"
								defaultMessage="Video"
								description="recording has video filter video"
							/>
						</a>
					</Link>
					<Link href={makeRoute(language, 'audio', 1)} legacyBehavior>
						<a
							className={clsx(
								styles.segmentedControl,
								filter === 'audio' && styles.segmentedControlActive,
							)}
						>
							<FormattedMessage
								id="recordingHasVideoFilter__filterAudio"
								defaultMessage="Audio only"
								description="recording has video filter audio"
							/>
						</a>
					</Link>
				</div>
			</div>
		</Dropdown>
	);
}
