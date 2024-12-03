import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '~lib/constants';
import IconDisclosure from '~public/img/icons/icon-disclosure-light-small.svg';
import IconSearch from '~public/img/icons/icon-search.svg';
import withFailStates from '~src/components/HOCs/withFailStates';
import BibleVersionTypeLockup from '~src/components/molecules/bibleVersionTypeLockup';
import Button from '~src/components/molecules/button';
import Dropdown from '~src/components/molecules/dropdown';
import IconButton from '~src/components/molecules/iconButton';
import Tease from '~src/components/molecules/tease';
import PassageNavigation from '~src/components/organisms/passageNavigation';
import { getBibleAcronym } from '~src/lib/getBibleAcronym';

import { GetAudiobibleIndexDataQuery } from './__generated__';
import styles from './index.module.scss';

// export type BibleIndexProps = GetAudiobibleIndexDataQuery;
export type BibleIndexProps = {
	data: NonNullable<GetAudiobibleIndexDataQuery['collections']['nodes']>;
};
function Bible({ data }: BibleIndexProps): JSX.Element {
	console.log({ data });
	return (
		<Tease className={styles.base}>
			<div className={styles.hat}>
				<BibleVersionTypeLockup unpadded />
				<a className={styles.historyButton} href="https://www.example.com">
					<FormattedMessage id="bibles__history" defaultMessage="History" />
				</a>
				<Dropdown
					id="booksMenu"
					trigger={({ isOpen, ...props }) => (
						<Button
							type="tertiary"
							text="KJV"
							IconRight={IconDisclosure}
							className={clsx(isOpen && styles.buttonOpen)}
							{...props}
						/>
					)}
				>
					{(handleClose) => (
						<div className={styles.dropdownContainer}>
							{data.map((version) => (
								<p key={version.id}>
									<a
										href={`https://www.example.com/${version.id}`}
										onClick={handleClose}
									>
										{getBibleAcronym(version.title)}
									</a>
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

			<div className={styles.content}>
				<PassageNavigation books={data[0].sequences.nodes || []} />
			</div>
		</Tease>
	);
}

export default withFailStates(Bible, {
	useShould404: ({ data }) => !data.length,
});
