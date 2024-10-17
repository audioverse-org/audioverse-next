import { useRouter } from 'next/router';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '~components/atoms/heading2';
import Heading6 from '~components/atoms/heading6';
import Link from '~components/atoms/linkWithoutPrefetch';
import { IBibleBook } from '~lib/api/bibleBrain';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import BibleVersionTypeLockup from '../bibleVersionTypeLockup';
import Card from '.';
import styles from './bibleBook.module.scss';

interface Props {
	book: IBibleBook;
	isOptionalLink?: boolean;
}

export default function CardBibleBook({
	book,
	isOptionalLink,
}: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	const router = useRouter();
	const {
		book_id: id,
		name: title,
		bible: { abbreviation },
	} = book;
	const chapterCount = book.chapters.length;

	const inner = (
		<>
			<BibleVersionTypeLockup
				label={
					<FormattedMessage
						id="cardBibleBook__typeLabel"
						defaultMessage="{abbreviation} Bible"
						values={{ abbreviation }}
					/>
				}
			/>
			<Heading2 className={styles.title}>{title}</Heading2>
			<Heading6 sans uppercase loose unpadded>
				<FormattedMessage
					id="cardBibleBook__chaptersLabel"
					defaultMessage="{count} chapters"
					values={{ count: chapterCount }}
				/>
			</Heading6>
		</>
	);

	const linkUrl = root
		.lang(languageRoute)
		.bibles.bookId(id)
		.chapterNumber(1)
		.get();

	return (
		<Card className={styles.card}>
			{isOptionalLink ? (
				<div
					className={styles.container}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						router.push(linkUrl);
					}}
				>
					{inner}
				</div>
			) : (
				<Link href={linkUrl} legacyBehavior>
					<a className={styles.container}>{inner}</a>
				</Link>
			)}
		</Card>
	);
}
