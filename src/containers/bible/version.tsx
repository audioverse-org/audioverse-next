import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Heading6 from '@components/atoms/heading6';
import HorizontalRule from '@components/atoms/horizontalRule';
import withFailStates from '@components/HOCs/withFailStates';
import BibleVersionTypeLockup from '@components/molecules/bibleVersionTypeLockup';
import CardBibleBook from '@components/molecules/card/bibleBook';
import CardGroup from '@components/molecules/cardGroup';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import Tease from '@components/molecules/tease';
import { BaseColors } from '@lib/constants';
import { GetVersionDetailPageDataQuery } from '@lib/generated/graphql';

import styles from './version.module.scss';

export interface VersionProps {
	version: GetVersionDetailPageDataQuery['audiobible'];
}

function Version({ version }: Must<VersionProps>): JSX.Element {
	const { books, copyrightText, sponsor, title } = version;

	const details: IDefinitionListTerm[] = [];
	if (copyrightText) {
		details.push({
			term: (
				<FormattedMessage
					id="bibleVersion__copyrightText"
					defaultMessage="Copyright"
				/>
			),
			definition: <div dangerouslySetInnerHTML={{ __html: copyrightText }} />,
		});
	}
	if (sponsor) {
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
						href={sponsor.url}
						target="_blank"
						className="decorated hover--salmon"
						rel="noreferrer"
					>
						{sponsor.name}
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
				{books.map((book) => (
					<CardBibleBook book={book} key={book.id} />
				))}
			</CardGroup>
		</Tease>
	);
}

export default withFailStates(Version, ({ version }) => !version);
