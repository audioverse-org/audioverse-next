import React from 'react';

import CardFavoriteEntity from './favoriteEntity';
import { CardFavoriteFragment } from '@components/molecules/card/__generated__/favorite';

interface CardEntityProps {
	favorite: CardFavoriteFragment;
}

export default function CardFavorite({
	favorite: { entity },
}: CardEntityProps): JSX.Element {
	return <CardFavoriteEntity entity={entity} />;
}
