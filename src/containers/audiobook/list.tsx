import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import withFailStates from '@components/HOCs/withFailStates';
import Button from '@components/molecules/button';
import CardSequence from '@components/molecules/card/sequence';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { GetAudiobookListPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeAudiobookListRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconBack from '../../../public/img/icon-back-light.svg';

import styles from './list.module.scss';

export type AudiobooksProps = PaginatedProps<
	NonNullable<GetAudiobookListPageDataQuery['audiobooks']['nodes']>[0],
	any
>;

function Audiobooks({ nodes, pagination }: AudiobooksProps): JSX.Element {
	const language = useLanguageRoute();
	return (
		<>
			<Button
				type="secondary"
				text={
					<FormattedMessage id="audiobookList__back" defaultMessage="Back" />
				}
				Icon={IconBack}
				href={`/${language}/collections`}
				className={styles.back}
			/>
			<Heading1 className={styles.heading}>
				<FormattedMessage
					id="audiobookList__heading"
					defaultMessage="All Audiobooks"
				/>
			</Heading1>
			<CardGroup>
				{nodes.map((book) => (
					<CardSequence sequence={book} key={book.canonicalPath} />
				))}
			</CardGroup>
			<Pagination
				current={pagination.current}
				total={pagination.total}
				makeRoute={makeAudiobookListRoute}
			/>
		</>
	);
}

export default withFailStates(Audiobooks, ({ nodes }) => !nodes.length);
