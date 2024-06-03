import React from 'react';
import { FormattedMessage } from 'react-intl';

import AddIcon from '../../../../../public/img/icons/add-light.svg';
import LoadIcon from '../../../../../public/img/icons/loading-icon.svg';
import PrivateIcon from '../../../../../public/img/icons/private-light.svg';
import PublicIcon from '../../../../../public/img/icons/public-light.svg';
import SuccessIcon from '../../../../../public/img/icons/success-light.svg';
import styles from './PlaylistItem.module.css';

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
		<div onClick={onPress} className={styles.pressable}>
			<div className={styles.line} />
			<div className={styles.container}>
				<div className={styles.leftContainer}>
					{isLoading ? (
						<LoadIcon />
					) : (
						<>
							{!isAdded ? (
								<AddIcon className={styles.leftIcon} />
							) : (
								<SuccessIcon className={styles.leftIcon} />
							)}
						</>
					)}
					{isLoading ? (
						<FormattedMessage id="loading" defaultMessage="Loading..." />
					) : (
						<span className={styles.title}>{title}</span>
					)}
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
