import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import withFailStates from '@components/HOCs/withFailStates';
import CardBibleVersion from '@components/molecules/card/bibleVersion';
import CardMasonry from '@components/molecules/cardMasonry';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import Tease from '@components/molecules/tease';
import { GetBibleVersionsPageDataQuery } from '@lib/generated/graphql';

import styles from './versions.module.scss';

type Versions = NonNullable<
	GetBibleVersionsPageDataQuery['audiobibles']['nodes']
>;

export interface VersionsProps {
	versions: Versions;
}

function Versions({ versions }: VersionsProps): JSX.Element {
	return (
		<Tease className={styles.tease}>
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
				render={({ data }) => <CardBibleVersion version={data} />}
			/>
		</Tease>
	);
}

export default withFailStates(Versions, ({ versions }) => !versions.length);
