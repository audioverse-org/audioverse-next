import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MuiModal from '@material-ui/core/Modal';
import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import Heading2 from '@/components/atoms/heading2';
import IconButton from '@/components/molecules/iconButton';
import { BaseColors } from '@/lib/constants';

import IconClose from '../../../public/img/icons/fa-times.svg';

import styles from './modal.module.scss';

interface ModalProps {
	title: string | JSX.Element;
	children: ReactNode;
	onClose: () => void;
	open: boolean;
	actions?: ReactNode;
}

export default function Modal({
	children,
	onClose,
	open,
	title,
	actions,
}: ModalProps): JSX.Element {
	const intl = useIntl();

	return (
		<MuiModal
			open={open}
			onClose={onClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 300,
				className: styles.backdrop,
			}}
		>
			<Fade in={open}>
				<div className={styles.modal}>
					<IconButton
						Icon={IconClose}
						onClick={onClose}
						color={BaseColors.DARK}
						backgroundColor={BaseColors.WHITE}
						className={styles.close}
						{...{
							'aria-label': intl.formatMessage({
								id: 'organism-modal__close',
								defaultMessage: 'Close',
							}),
						}}
					/>
					<Heading2>{title}</Heading2>
					{children}
					{actions && <div className={styles.buttonRow}>{actions}</div>}
				</div>
			</Fade>
		</MuiModal>
	);
}
