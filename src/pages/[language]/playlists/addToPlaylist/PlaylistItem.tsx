import React from 'react';

import AddIcon from '../../../../../public/img/icons/add-light.svg';
import PrivateIcon from '../../../../../public/img/icons/private-light.svg';
import PublicIcon from '../../../../../public/img/icons/public-light.svg';
import SuccessIcon from '../../../../../public/img/icons/success-light.svg';
import styles from './PlaylistItem.module.css'; // Using CSS Module for styling

type Props = {
	onPress: () => void;
	isAdded: boolean;
	title: string;
	isPublic: boolean;
};

const PlaylistItem: React.FC<Props> = ({
	onPress,
	isAdded,
	title,
	isPublic,
}) => {
	return (
		<div onClick={onPress} className={styles.pressable}>
			<div className={styles.line} />
			<div className={styles.container}>
				<div className={styles.leftContainer}>
					{!isAdded ? (
						<AddIcon className={styles.leftIcon} />
					) : (
						<SuccessIcon className={styles.leftIcon} width="24" height="24" />
					)}
					<span className={styles.title}>{title}</span>
				</div>
				{isPublic ? (
					<PublicIcon className={styles.rightIcon} />
				) : (
					<PrivateIcon className={styles.rightIcon} />
				)}
			</div>
		</div>
	);
};

export default PlaylistItem;
