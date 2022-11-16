import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Heading6 from '@components/atoms/heading6';
import HorizontalRule from '@components/atoms/horizontalRule';
import withFailStates from '@components/HOCs/withFailStates';
import BibleVersionTypeLockup from '@components/molecules/bibleVersionTypeLockup';
import CardBibleBook from '@components/molecules/card/bibleBook';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import Tease from '@components/molecules/tease';
import { IBibleVersion } from '@lib/api/bibleBrain';
import { BaseColors } from '@lib/constants';
import { GetAudiobibleVersionDataQuery } from '@lib/generated/graphql';

import styles from './version.module.scss';

export interface VersionProps {
	version: IBibleVersion | GetAudiobibleVersionDataQuery['collection'];
}

function Version({ version }: Must<VersionProps>): JSX.Element {
	const { title, description, sponsor } = version;

	const details: IDefinitionListTerm[] = [];
	if (description) {
		details.push({
			term: (
				<FormattedMessage
					id="bibleVersion__description"
					defaultMessage="Description"
				/>
			),
			definition: <p>{description}</p>,
		});
	}
	if (sponsor && 'canonicalPath' in sponsor && sponsor.canonicalPath) {
		details.push({
			term: (
				<FormattedMessage
					id="bibleVersion__sponsorLabel"
					defaultMessage="Sponsor"
				/>
			),
			definition: (
				<Link href={sponsor.canonicalPath} className="decorated hover--salmon">
					{sponsor.title}
				</Link>
			),
		});
		if (sponsor.website) {
			details.push({
				term: (
					<FormattedMessage
						id="bibleVersion__websiteLabel"
						defaultMessage="Website"
					/>
				),
				definition: (
					(<Link
                        href={sponsor.website}
                        className="decorated hover--salmon"
                        target="_blank"
                        rel="nofollow noreferrer">

                        {sponsor.website}

                    </Link>)
				),
			});
		}
	} else if (sponsor?.website) {
		details.push({
			term: (
				<FormattedMessage
					id="bibleVersion__sponsorLabel"
					defaultMessage="Sponsor"
				/>
			),
			definition: (
				<p>
					<a
						href={sponsor.website}
						target="_blank"
						className="decorated hover--salmon"
						rel="noreferrer"
					>
						{sponsor.title}
					</a>
				</p>
			),
		});
	}

	return (
		<Tease className={styles.container}>
			<ContentWidthLimiter>
				<BibleVersionTypeLockup />
				<Heading1 className={styles.title}>{title}</Heading1>
				<Heading6 sans uppercase loose className={styles.booksLabel}>
					<FormattedMessage
						id="bibleVersion__booksLabel"
						defaultMessage="66 Books"
					/>
				</Heading6>
				<HorizontalRule color={BaseColors.LIGHT_TONE} />
				<DefinitionList terms={details} textColor={BaseColors.LIGHT_TONE} />
			</ContentWidthLimiter>
			<CardGroup>
				{'books' in version
					? version.books.map((book) => (
							<CardBibleBook book={book} key={book.book_id} />
					  ))
					: version.sequences.nodes?.map((s) => (
							<CardSequence sequence={s} key={s.id} />
					  ))}
			</CardGroup>
		</Tease>
	);
}

export default withFailStates(Version, {
	useShould404: ({ version }) => !version,
});
