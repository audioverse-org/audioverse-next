import clsx from 'clsx';
import React from 'react';

import { LANGUAGES } from '@lib/constants';
import { Language } from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import getLanguageIds from '@lib/getLanguageIds';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconDisclosure from '../../../public/img/icon-disclosure-light-small.svg';
import IconLanguage from '../../../public/img/icon-language-light.svg';

import Button, { IButtonType } from './button';
import Dropdown from './dropdown';
import styles from './languageButton.module.scss';

type Props = {
	onClick: (baseUrl: string) => void;
	buttonType: IButtonType;
	className?: string;
};

export default function LanguageButton({
	onClick,
	buttonType,
	className,
}: Props): JSX.Element | null {
	const languageRoute = useLanguageRoute();
	const languageId = getLanguageIdByRoute(languageRoute);

	const languageIds = getLanguageIds().filter((l) => l !== Language.Nordic);

	return (
		<Dropdown
			id="languagesMenu"
			trigger={({ isOpen, ...props }) => (
				<Button
					type={buttonType}
					text={LANGUAGES[languageId].display_name}
					IconLeft={IconLanguage}
					IconRight={IconDisclosure}
					className={clsx(className, isOpen && styles.buttonOpen)}
					{...props}
				/>
			)}
			alignment="left"
		>
			{(handleClose) => (
				<div className={styles.dropdownContainer}>
					{languageIds.map((id) => (
						<p className={styles.languageAlternative} key={id}>
							<a
								onClick={(e) => {
									e.preventDefault();
									handleClose();
									onClick(LANGUAGES[id].base_url);
								}}
							>
								{LANGUAGES[id].display_name}
							</a>
						</p>
					))}
				</div>
			)}
		</Dropdown>
	);
}
