import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import Link from '~components/atoms/linkWithoutPrefetch';
import root from '~lib/routes';
import useHover from '~src/lib/hooks/useHover';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import { IBibleVersion } from '~src/services/fcbh/types';

import BibleVersionTypeLockup from '../bibleVersionTypeLockup';
import Card from '.';
import CardBibleBook from './bibleBook';
import styles from './bibleVersion.module.scss';

interface Props {
	version: IBibleVersion;
}

export default function CardBibleVersion({ version }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	const { id, title, books } = version;
	const [subRef, isSubHovered] = useHover<HTMLDivElement>();

	return (
		<Card>
			<Link
				href={root.lang(languageRoute).bibles.versionId(id).get()}
				legacyBehavior
			>
				<a className={clsx(styles.column, isSubHovered && styles.otherHovered)}>
					<BibleVersionTypeLockup />
					<Heading2 className={styles.title}>{title}</Heading2>
					<Heading6 sans uppercase loose className={styles.booksLabel}>
						<FormattedMessage
							id="cardBibleVersion__booksLabel"
							defaultMessage="66 Books"
						/>
					</Heading6>
					<div ref={subRef}>
						{books.slice(0, 2).map((book) => (
							<div className={styles.book} key={book.book_id}>
								<CardBibleBook book={book} isOptionalLink />
							</div>
						))}
					</div>
					<Heading6
						large
						loose
						sans
						unpadded
						uppercase
						className={styles.showAll}
					>
						<FormattedMessage
							id="cardBibleVersion__showAll"
							defaultMessage="Show All"
						/>
					</Heading6>
				</a>
			</Link>
		</Card>
	);
}
