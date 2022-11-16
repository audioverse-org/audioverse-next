import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Heading2 from '@components/atoms/heading2';
import RoundImage from '@components/atoms/roundImage';
import withFailStates from '@components/HOCs/withFailStates';
import ButtonBack from '@components/molecules/buttonBack';
import Card from '@components/molecules/card';
import JumpBar from '@components/molecules/jumpBar';
import { GetPresenterListPageDataQuery } from '@lib/generated/graphql';
import {
	makeDiscoverCollectionsRoute,
	makePresenterListRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './list.module.scss';

export type PresentersProps = {
	persons: NonNullable<GetPresenterListPageDataQuery['persons']['nodes']>;
	personLetterCounts: NonNullable<
		GetPresenterListPageDataQuery['personLetterCounts']
	>;
};
// TODO: replace with presenters landing page (featured, recent, trending, etc.)

function Presenters({
	persons,
	personLetterCounts,
}: PresentersProps): JSX.Element {
	const language = useLanguageRoute();
	const jumpLinks = personLetterCounts.map(({ letter }) => ({
		text: letter,
		url: makePresenterListRoute(language, letter),
	}));

	return (
		<>
			<ButtonBack
				backUrl={makeDiscoverCollectionsRoute(language)}
				className={styles.back}
			/>
			<Heading1 className={styles.heading}>
				<FormattedMessage
					id="presentersList__title"
					defaultMessage="All Presenters"
				/>
			</Heading1>
			<JumpBar links={jumpLinks} />
			<Heading2>{persons[0].surname.substring(0, 1).toUpperCase()}</Heading2>
			{persons.map(({ canonicalPath, image, givenName, surname, summary }) => (
				<Card className={styles.card} key={canonicalPath}>
					<Link href={canonicalPath} className={styles.container}>
						<a>
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

export default withFailStates(Presenters, {
	useShould404: ({ persons }) => !persons?.length,
});
