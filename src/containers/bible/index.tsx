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
							{/* <p key="version1">
								<a
									onClick={(e) => {
										e.preventDefault();
										handleClose();
									}}
								>
									<FormattedMessage
										id="bibles__version1"
										defaultMessage="version 1"
									/>
								</a>
							</p>
							<p key="version2">
								<a
									onClick={(e) => {
										e.preventDefault();
										handleClose();
									}}
								>
									<FormattedMessage
										id="bibles__version2"
										defaultMessage="version 2"
									/>
								</a>
							</p> */}
							{data.map((audiobible) => (
								<p key={audiobible.id}>
									<a
										href={`https://www.example.com/${audiobible.id}`}
										onClick={handleClose}
									>
										{audiobible.title}
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
