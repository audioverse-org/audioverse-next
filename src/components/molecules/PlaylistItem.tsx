import React from 'react';

import AddIcon from '../../../public/img/icons/add-light.svg';
import LoadIcon from '../../../public/img/icons/loading-icon.svg';
import PrivateIcon from '../../../public/img/icons/private-light.svg';
import PublicIcon from '../../../public/img/icons/public-light.svg';
import SuccessIcon from '../../../public/img/icons/success-light.svg';
import styles from './PlaylistItem.module.scss';

type Props = {
	onPress: () => void;
	isAdded: boolean;
	title: string;
	isPublic: boolean;
	isLoading: boolean;
};

const PlaylistItem: React.FC<Props> = ({
	onPress,
	isAdded,
	title,
	isPublic,
	isLoading,
}) => {
	return (
		<div
			onClick={!isLoading ? onPress : undefined}
			className={styles.pressable}
		>
			<div className={styles.line} />
			<div className={styles.container}>
				<div className={styles.leftContainer}>
					{isLoading ? (
						<LoadIcon className={styles.leftIcon} />
					) : (
						<>
							{!isAdded ? (
								<AddIcon className={styles.leftIcon} />
							) : (
								<SuccessIcon className={styles.leftIcon} />
							)}
						</>
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
