import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import { IBibleBook } from '@lib/api/bibleBrain';
import { makeBibleBookRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import BibleVersionTypeLockup from '../bibleVersionTypeLockup';

import styles from './bibleBook.module.scss';

import Card from '.';

interface Props {
	book: IBibleBook;
}

export default function CardBibleBook({ book }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	const {
		book_id: id,
		name: title,
		bible: { abbreviation },
	} = book;
	const chapterCount = book.chapters.length;

	return (
		<Card className={styles.card}>
			<Link href={makeBibleBookRoute(languageRoute, id)}>
				<a className={styles.container}>
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
				</a>
			</Link>
		</Card>
	);
}
