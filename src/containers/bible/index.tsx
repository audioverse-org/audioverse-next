import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '~lib/constants';
import IconDisclosure from '~public/img/icons/icon-disclosure-light-small.svg';
import IconSearch from '~public/img/icons/icon-search.svg';
import BibleVersionTypeLockup from '~src/components/molecules/bibleVersionTypeLockup';
import Button from '~src/components/molecules/button';
import Dropdown from '~src/components/molecules/dropdown';
import IconButton from '~src/components/molecules/iconButton';
import Tease from '~src/components/molecules/tease';

import styles from './styles.module.scss';

export default function Bible(): JSX.Element {
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
							<p key="bookid">
								<a
									onClick={(e) => {
										e.preventDefault();
										handleClose();
									}}
								>
									Bookname
								</a>
							</p>
							<p key="bookid2">
								<a
									onClick={(e) => {
										e.preventDefault();
										handleClose();
									}}
								>
									Bookname 2
								</a>
							</p>
						</div>
					)}
				</Dropdown>
				<IconButton
					Icon={IconSearch}
					onClick={function (event: React.MouseEvent<HTMLElement>): void {
						throw new Error('Function not implemented.');
					}}
					color={BaseColors.WHITE}
					backgroundColor={BaseColors.DARK}
				/>
			</div>

			<div className={styles.content}>Hello, world!</div>
		</Tease>
	);
}
