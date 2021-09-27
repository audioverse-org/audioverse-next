import { Menu } from '@material-ui/core';
import React, { MouseEvent, PropsWithChildren } from 'react';

import styles from './dropdown.module.scss';

type Props = {
	id: string;
	trigger: (props: {
		onClick: (event: MouseEvent<any>) => void;
		['aria-controls']: string;
		isOpen: boolean;
	}) => JSX.Element;
	alignment?: 'left' | 'right';
};

export default function Dropdown({
	id,
	trigger,
	children,
	alignment = 'right',
}: PropsWithChildren<Props>): JSX.Element {
	const [anchorEl, setAnchorEl] = React.useState<any>(null);

	const handleClick = (event: MouseEvent) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			{trigger({
				onClick: handleClick,
				'aria-controls': id,
				isOpen: !!anchorEl,
			})}
			<Menu
				id={id}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				keepMounted
				anchorEl={anchorEl}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: alignment,
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: alignment,
				}}
				PaperProps={{
					className: styles.paper,
				}}
			>
				{children}
			</Menu>
		</>
	);
}
