import React from 'react';

import { FormattedMessage } from 'react-intl';

import { BaseColors } from '~lib/constants';
import IconDisclosure from '~public/img/icons/icon-disclosure-light-small.svg';
import IconSearch from '~public/img/icons/icon-search.svg';

import BibleVersionTypeLockup from '~src/components/molecules/bibleVersionTypeLockup';
import Button from '~src/components/molecules/button';
import Dropdown from '~src/components/molecules/dropdown';
import IconButton from '~src/components/molecules/iconButton';

import { getBibleAcronym } from '~src/lib/getBibleAcronym';

import styles from './index.module.scss';
import { GetAudiobibleIndexDataQuery } from './__generated__';

type Version = NonNullable<
	GetAudiobibleIndexDataQuery['collections']['nodes']
>[0];

type Props = {
	selected: Version;
	onSelect: (version: Version) => void;
	versions: Array<Version>;
};

export default function BibleHat({ selected, versions, onSelect }: Props) {
	return (
		<div className={styles.hat}>
			<BibleVersionTypeLockup unpadded />
			<a className={styles.historyButton} href="https://www.example.com">
				<FormattedMessage
					id="bibles__history"
					defaultMessage="History"
				/>
			</a>
			<Dropdown
				id="booksMenu"
				trigger={(props) => (
					<Button
						type="tertiary"
						text={getBibleAcronym(selected.title)}
						IconRight={IconDisclosure}
						className={styles.dropdownButton}
						{...props}
					/>
				)}
			>
				{(handleClose) => (
					<div className={styles.dropdownContainer}>
						{versions.map((version) => (
							<p key={version.id}>
								<Button
									type="tertiary"
									onClick={() => {
										onSelect(version);
										handleClose();
									}}
									text={getBibleAcronym(version.title)}
								/>
							</p>
						))}
					</div>
				)}
			</Dropdown>
			<IconButton
				Icon={IconSearch}
				onClick={function (): void {
					throw new Error('Function not implemented.');
				}}
				color={BaseColors.WHITE}
				backgroundColor={BaseColors.DARK}
			/>
		</div>
	);
}
