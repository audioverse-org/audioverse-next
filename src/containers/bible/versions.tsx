import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import withFailStates from '@components/HOCs/withFailStates';
import CardBibleVersion from '@components/molecules/card/bibleVersion';
import CardCollection from '@components/molecules/card/collection';
import CardMasonry from '@components/molecules/cardMasonry';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import Tease from '@components/molecules/tease';
import { IBibleVersion } from '@lib/api/bibleBrain';
import { GetAudiobibleVersionsDataQuery } from '@lib/generated/graphql';

import styles from './versions.module.scss';

export interface VersionsProps {
	versions: Array<
		| IBibleVersion
		| NonNullable<GetAudiobibleVersionsDataQuery['collections']['nodes']>[0]
	>;
}

function Versions({ versions }: VersionsProps): JSX.Element {
	return (
		<Tease className={styles.tease} fullBleed={false}>
			<ContentWidthLimiter>
				<Heading1>
					<FormattedMessage
						id="bibleVersions__heading"
						defaultMessage="Bible"
					/>
				</Heading1>
				<div className={styles.kicker}>
					<FormattedMessage
						id="bibleVersions__intro"
						defaultMessage="The best way to learn sound doctrine is by listening to the Word of God. Our audio Bibles give you the ability to listen to great teachings from the greatest teacher of all."
					/>
				</div>
			</ContentWidthLimiter>

			<CardMasonry
				items={versions}
				render={({ data }) =>
					'canonicalPath' in data ? (
						<CardCollection
							collection={data}
							sequences={data.sequences.nodes}
						/>
					) : (
						<CardBibleVersion version={data} />
					)
				}
			/>
		</Tease>
	);
}

export default withFailStates(Versions, {
	should404: ({ versions }) => !versions.length,
});
