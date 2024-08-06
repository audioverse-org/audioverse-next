import React from 'react';
import { SetRequired } from 'type-fest';

import { CollectionContentType } from '~src/__generated__/graphql';

import { CardCollectionFragment } from './__generated__/collection';
import { CardPersonFragment } from './__generated__/person';
import { CardRecordingFragment } from './__generated__/recording';
import { CardSequenceFragment } from './__generated__/sequence';
import { CardSponsorFragment } from './__generated__/sponsor';
import CardCollection from './collection';
import CardPerson from './person';
import CardRecording from './recording';
import CardSequence from './sequence';
import CardSponsor from './sponsor';

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
			return (
				<CardPerson person={entity as CardPersonFragment} midinit={true} />
			);
		case Typename.Recording:
			return (
				<CardRecording recording={entity as CardRecordingFragment} fullBleed />
			);
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
