import React from 'react';

import { CardFavoriteFragment } from '@components/molecules/card/favorite.gql';

import CardFavoriteEntity from './favoriteEntity';

interface CardEntityProps {
	favorite: CardFavoriteFragment;
}

export default function CardFavorite({
	favorite: { entity },
}: CardEntityProps): JSX.Element {
	return <CardFavoriteEntity entity={entity} />;
}
