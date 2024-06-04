import React from 'react';
import { useIntl } from 'react-intl';

import { useIsRecordingFavorited } from '~src/lib/api/useIsRecordingFavorited';

import PlaylistItem from './PlaylistItem';

type Props = {
	id: string | number;
};

const ListenLaterItem = ({ id }: Props) => {
	const intl = useIntl();
	const { isFavorited, toggleFavorited, isLoading } =
		useIsRecordingFavorited(id);

	const toggleFavorite = () => {
		toggleFavorited();
	};

	return (
		<PlaylistItem
			onPress={toggleFavorite}
			isAdded={!!isFavorited}
			title={intl.formatMessage({
				id: `Listen_Later`,
				defaultMessage: 'Listen Later',
			})}
			isPublic={false}
			isLoading={isLoading}
		/>
	);
};

export default ListenLaterItem;
