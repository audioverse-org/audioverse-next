import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import CircleInitials from '~components/atoms/circleInitials';
import Heading1 from '~components/atoms/heading1';
import RoundImage from '~components/atoms/roundImage';
import Card from '~components/molecules/card';
import JumpBar from '~components/molecules/jumpBar';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

import {
	GetPersonListLetterCountsQuery,
	PresenterListEntryFragment,
} from './__generated__/list';
import styles from './list.module.scss';

export type PresentersProps = {
	persons: PresenterListEntryFragment[];
	personLetterCounts: GetPersonListLetterCountsQuery['personLetterCounts'];
};
// TODO: replace with presenters landing page (featured, recent, trending, etc.)

export default function Presenters({
	persons,
	personLetterCounts,
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
		<div className={styles.parent}>
			<Heading1 className={styles.heading}>
				<FormattedMessage
					id="presentersList__title"
					defaultMessage="All Presenters"
				/>
			</Heading1>
			<JumpBar links={jumpLinks} />

			{persons.map(({ canonicalPath, image, givenName, surname, summary }) => (
				<Card className={styles.card} key={canonicalPath}>
					<Link href={canonicalPath} legacyBehavior>
						<a className={styles.container}>
							<div className={styles.nameLockup}>
								{image ? (
									<div className={styles.image}>
										<RoundImage
											image={image.url}
											alt={`${surname}, ${givenName}`}
										/>
									</div>
								) : (
									<CircleInitials name={givenName + ' ' + surname} mid={true} />
								)}
								<div className={styles.textWrapper}>
									<span className={styles.name}>
										{surname}, {givenName}
									</span>
									{summary && (
										<span
											className={styles.summary}
											dangerouslySetInnerHTML={{ __html: summary }}
										/>
									)}
								</div>
							</div>
						</a>
					</Link>
				</Card>
			))}
		</div>
	);
}
