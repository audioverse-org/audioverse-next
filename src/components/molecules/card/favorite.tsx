import React from 'react';

import CardFavoriteEntity from './favoriteEntity';
import { CardFavoriteFragment } from './__generated__/favorite';

interface CardEntityProps {
	favorite: CardFavoriteFragment;
}

export default function CardFavorite({
	favorite: { entity },
}: CardEntityProps): JSX.Element {
	return <CardFavoriteEntity entity={entity} />;
}
