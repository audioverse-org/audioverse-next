import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import Heading2 from '@components/atoms/heading2';
import LineHeading from '@components/atoms/lineHeading';
import RoundImage from '@components/atoms/roundImage';
import withFailStates from '@components/HOCs/withFailStates';
import ButtonBack from '@components/molecules/buttonBack';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import PersonTypeLockup from '@components/molecules/personTypeLockup';
import Tease from '@components/molecules/tease';
import TeaseHeader from '@components/molecules/teaseHeader';
import { GetPresenterRecordingsPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makePresenterRecordingsRoute } from '@lib/routes';

import styles from './recordings.module.scss';

export type PresenterRecordingsProps = PaginatedProps<
	NonNullable<
		NonNullable<
			NonNullable<
				GetPresenterRecordingsPageDataQuery['person']
			>['recordings']['nodes']
		>[0]
	>,
	GetPresenterRecordingsPageDataQuery
> & { rssPath: string | null };

function PresenterRecordings({
	nodes,
	data,
	pagination,
}: Must<PresenterRecordingsProps>): JSX.Element {
	const { id, name, canonicalPath, imageWithFallback } = data.person as any;

	return (
		<Tease className={styles.container}>
			<TeaseHeader>
				<ButtonBack backUrl={canonicalPath} className={styles.back} />
				<PersonTypeLockup />
				<div className={styles.titleLockup}>
					<div className={styles.image}>
						<RoundImage image={imageWithFallback.url} alt={name} />
					</div>
					<Heading2 sans unpadded>
						{name}
					</Heading2>
				</div>
			</TeaseHeader>
			<LineHeading color={BaseColors.RED}>
				<FormattedMessage
					id="presenterRecordingsDetail__heading"
					defaultMessage="All Recordings"
				/>
			</LineHeading>
			<CardGroup>
				{nodes.map((node) => (
					<CardRecording recording={node} key={node.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				{...pagination}
				makeRoute={(languageRoute, pageIndex) =>
					makePresenterRecordingsRoute(languageRoute, id, pageIndex)
				}
			/>
		</Tease>
	);
}

export default withFailStates(
	PresenterRecordings,
	({ nodes }) => !nodes.length
);
