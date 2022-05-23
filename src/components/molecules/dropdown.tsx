import { Menu } from '@mui/material';
// import dynamic from 'next/dynamic';
import React, { MouseEvent, PropsWithChildren, ReactNode } from 'react';

import styles from './dropdown.module.scss';

type Props = {
	id: string;
	trigger: (props: {
		onClick: (event: MouseEvent) => void;
		['aria-controls']: string;
		isOpen: boolean;
	}) => JSX.Element;
	alignment?: 'left' | 'right';
	children?: ReactNode | ((handleClose: () => void) => ReactNode);
};

// const LazyMenu = dynamic(() => import('@material-ui/core/Menu'));

export default function Dropdown({
	id,
	trigger,
	children,
	alignment = 'right',
}: PropsWithChildren<Props>): JSX.Element {
	const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

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
				{typeof children === 'function' ? children(handleClose) : children}
			</Menu>
		</>
	);
}
