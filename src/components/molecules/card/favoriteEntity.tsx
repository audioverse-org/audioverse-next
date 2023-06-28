import { UnreachableCaseError } from '~lib/typeHelpers';

import { CardFavoriteEntityFragment } from './__generated__/favoriteEntity';
import CardCollection from './collection';
import CardPerson from './person';
import CardRecording from './recording';
import CardRecordingStack from './recordingStack';
import CardSequence from './sequence';
import CardSponsor from './sponsor';

interface CardEntityProps {
	entity: CardFavoriteEntityFragment;
	disableSequenceStack?: boolean;
}

export default function CardFavoriteEntity({
	entity,
	disableSequenceStack,
}: CardEntityProps): JSX.Element {
	switch (entity.__typename) {
		case 'Collection':
			return <CardCollection collection={entity} />;
		case 'Person':
			return <CardPerson person={entity} />;
		case 'Recording':
			return <CardRecording recording={entity} />;
		case 'Sequence':
			return entity.viewerHasFavorited || disableSequenceStack ? (
				<CardSequence sequence={entity} />
			) : (
				<CardRecordingStack sequence={entity} />
			);
		case 'Sponsor':
			return <CardSponsor sponsor={entity} />;

		default:
			throw new UnreachableCaseError(entity);
	}
}
