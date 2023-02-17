import CardPerson from './person';
import CardRecording from './recording';
import CardSequence from './sequence';
import CardCollection from './collection';
import CardSponsor from './sponsor';
import {
	CardCollectionFragment,
	CardPersonFragment,
	CardRecordingFragment,
	CardSequenceFragment,
	CardSponsorFragment,
	CollectionContentType,
} from '@lib/generated/graphql';
import React from 'react';
import { SetRequired } from 'type-fest';

// Presenters;
// Teachings;
// Series;
// Audiobooks;
// Sponsors;
// Conferences;
// Music;
// Stories;

type EntityUnion =
	| CardPersonFragment
	| CardRecordingFragment
	| CardSequenceFragment
	| CardCollectionFragment
	| CardSponsorFragment;

export type InferrableEntity = SetRequired<EntityUnion, '__typename'>;

const Typename = {
	Person: 'Person',
	Recording: 'Recording',
	Sequence: 'Sequence',
	Collection: 'Collection',
	Sponsor: 'Sponsor',
};

export default function CardInferred({ entity }: { entity: InferrableEntity }) {
	switch (entity.__typename) {
		case Typename.Person:
			return <CardPerson person={entity as CardPersonFragment} />;
		case Typename.Recording:
			return <CardRecording recording={entity as CardRecordingFragment} />;
		case Typename.Sequence:
			return <CardSequence sequence={entity as CardSequenceFragment} />;
		case Typename.Collection: {
			const e = entity as CardCollectionFragment;
			switch (e.collectionContentType) {
				case CollectionContentType.AudiobookSeries:
					return <CardCollection collection={e} />;
				case CollectionContentType.BibleVersion:
					return <CardCollection collection={e} />;
				case CollectionContentType.Conference:
					return <CardCollection collection={e} />;
				case CollectionContentType.MusicSeries:
					return <CardCollection collection={e} />;
				case CollectionContentType.StoryProgram:
					return <CardCollection collection={e} />;
				default:
					console.log({ e });
					throw new Error(
						`Unknown collectionContentType: ${e.collectionContentType}`
					);
			}
		}
		case Typename.Sponsor:
			return <CardSponsor sponsor={entity as CardSponsorFragment} />;
		default:
			console.log({ entity });
			throw new Error(`Unknown typename: ${entity.__typename}`);
	}
}