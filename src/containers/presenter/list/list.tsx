import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Heading2 from '@components/atoms/heading2';
import RoundImage from '@components/atoms/roundImage';
import ButtonBack from '@components/molecules/buttonBack';
import Card from '@components/molecules/card';
import JumpBar from '@components/molecules/jumpBar';
import root from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './list.module.scss';
import {
	GetPersonListLetterCountsQuery,
	PresenterListEntryFragment,
} from './__generated__/list';

export type PresentersProps = {
	persons: PresenterListEntryFragment[];
	personLetterCounts: GetPersonListLetterCountsQuery['personLetterCounts'];
	title: string;
};
// TODO: replace with presenters landing page (featured, recent, trending, etc.)

export default function Presenters({
	persons,
	personLetterCounts,
	title,
}: PresentersProps): JSX.Element {
	const language = useLanguageRoute();
	const intl = useIntl();
	const jumpLinks = [
		{
			text: intl.formatMessage({
				id: 'presentersList__all',
				defaultMessage: 'All',
			}),
			url: root.lang(language).presenters.all.get(),
		},
		...personLetterCounts.map(({ letter }) => ({
			text: letter,
			url: root.lang(language).presenters.letter(letter).get(),
		})),
	];

	return (
		<>
			<ButtonBack
				backUrl={root.lang(language).discover.collections.get()}
				className={styles.back}
			/>
			<Heading1 className={styles.heading}>
				<FormattedMessage
					id="presentersList__title"
					defaultMessage="All Presenters"
				/>
			</Heading1>
			<JumpBar links={jumpLinks} />
			{/* <Heading2>{persons[0].surname.substring(0, 1).toUpperCase()}</Heading2> */}
			<Heading2>{title}</Heading2>
			{persons.map(({ canonicalPath, image, givenName, surname, summary }) => (
				<Card className={styles.card} key={canonicalPath}>
					<Link href={canonicalPath} legacyBehavior>
						<a className={styles.container}>
							<div className={styles.nameLockup}>
								{image && (
									<div className={styles.image}>
										<RoundImage
											image={image.url}
											alt={`${surname}, ${givenName}`}
										/>
									</div>
								)}
								<span className={styles.name}>
									{surname}, {givenName}
								</span>
							</div>
							{summary && (
								<span
									className={styles.summary}
									dangerouslySetInnerHTML={{ __html: summary }}
								/>
							)}
						</a>
					</Link>
				</Card>
			))}
		</>
	);
}
