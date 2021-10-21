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
import Pagination from '@components/molecules/pagination';
import { GetPresenterListPageDataQuery } from '@lib/generated/graphql';
import { getLetterCountsWithPage } from '@lib/getLetterCountsWithPage';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import {
	makeDiscoverCollectionsRoute,
	makePresenterListRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './list.module.scss';

export type PresentersProps = PaginatedProps<
	NonNullable<GetPresenterListPageDataQuery['persons']['nodes']>[0],
	GetPresenterListPageDataQuery
>;

// TODO: replace with presenters landing page (featured, recent, trending, etc.)

function Presenters({ nodes, pagination, data }: PresentersProps): JSX.Element {
	const language = useLanguageRoute();
	const jumpLinks = getLetterCountsWithPage(data?.personLetterCounts || []).map(
		({ letter, page }) => ({
			text: letter,
			url: makePresenterListRoute(language, page),
		})
	);

	let currentFirstLetter = '';
	return (
		<>
			<ButtonBack
				backUrl={makeDiscoverCollectionsRoute(language)}
				className={styles.back}
			/>
			<Heading1>
				<FormattedMessage
					id="presentersList__title"
					defaultMessage="All Speakers"
				/>
			</Heading1>
			<JumpBar links={jumpLinks} />
			<div>
				{nodes.map(({ canonicalPath, image, givenName, surname, summary }) => {
					const nodeFirstLetter = surname.substring(0, 1);
					const letterHeading =
						currentFirstLetter !== nodeFirstLetter ? (
							<Heading2>{nodeFirstLetter}</Heading2>
						) : null;
					currentFirstLetter = nodeFirstLetter;

					return (
						<React.Fragment key={canonicalPath}>
							{letterHeading}
							<Card className={styles.card}>
								<Link href={canonicalPath}>
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
						</React.Fragment>
					);
				})}
			</div>
			<Pagination makeRoute={makePresenterListRoute} {...pagination} />
		</>
	);
}

export default withFailStates(Presenters, ({ nodes }) => !nodes?.length);
