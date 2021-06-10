import { Button, Link, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React from 'react';

import { LANGUAGES } from '@lib/constants';
import getLanguageIds from '@lib/getLanguageIds';
import { useLanguageId } from '@lib/useLanguageId';

import LanguageIcon from '../../../public/img/icon-language-solid.svg';

import styles from './languageSwitcher.module.scss';

export default function LanguageSwitcher(): JSX.Element {
	const languageId = useLanguageId();
	const languageIds = getLanguageIds();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// TODO: give FA attribution, or purchase a license
	return (
		<span className={styles.languages}>
			<Button onClick={handleClick}>
				<LanguageIcon className={styles.adornment} width={16} height={16} />
				{LANGUAGES[languageId].display_name}
				<ArrowDropDownIcon />
			</Button>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{languageIds.map((id) => (
					<MenuItem
						key={id}
						component={Link}
						href={`/${LANGUAGES[id].base_url}`}
					>
						{LANGUAGES[id].display_name}
					</MenuItem>
				))}
			</Menu>
		</span>
	);
}
