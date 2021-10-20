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
import { GetSponsorListPageDataQuery } from '@lib/generated/graphql';
import { getLetterCountsWithPage } from '@lib/getPaginatedData';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import {
	makeDiscoverCollectionsRoute,
	makeSponsorListRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './list.module.scss';

export type SponsorsProps = PaginatedProps<
	NonNullable<GetSponsorListPageDataQuery['sponsors']['nodes']>[0],
	GetSponsorListPageDataQuery
>;

// TODO: replace with sponsors landing page (featured, recent, trending, etc.)

function Sponsors({ nodes, pagination, data }: SponsorsProps): JSX.Element {
	const language = useLanguageRoute();
	const jumpLinks = getLetterCountsWithPage(
		data?.sponsorLetterCounts || []
	).map(({ letter, page }) => ({
		text: letter,
		url: makeSponsorListRoute(language, page),
	}));

	let currentFirstLetter = '';
	return (
		<>
			<ButtonBack
				backUrl={makeDiscoverCollectionsRoute(language)}
				className={styles.back}
			/>
			<Heading1>
				<FormattedMessage
					id="sponsorsList__title"
					defaultMessage="All Sponsors"
				/>
			</Heading1>
			<JumpBar links={jumpLinks} />
			<div>
				{nodes.map(({ canonicalPath, image, title }) => {
					const nodeFirstLetter = title.substring(0, 1);
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
										{image && (
											<div className={styles.image}>
												<RoundImage image={image.url} />
											</div>
										)}
										<span className={styles.sponsorName}>{title}</span>
									</a>
								</Link>
							</Card>
						</React.Fragment>
					);
				})}
			</div>
			<Pagination makeRoute={makeSponsorListRoute} {...pagination} />
		</>
	);
}

export default withFailStates(Sponsors, ({ nodes }) => !nodes?.length);
