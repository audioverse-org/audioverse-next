import React, { PropsWithChildren } from 'react';

import Heading1 from '~components/atoms/heading1';
import CardGroup from '~components/molecules/cardGroup';
import Pagination from '~components/molecules/pagination';
import { PaginationData } from '~lib/getPaginatedStaticProps';

import styles from './paginatedCardList.module.scss';

export interface PaginatedCardListProps {
	pagination: PaginationData;
	heading: string | JSX.Element;
	makeRoute: (languageRoute: string, pageIndex: number) => string;
	filter?: JSX.Element;
}

export default function PaginatedCardList({
	heading,
	children,
	makeRoute,
	pagination,
	filter,
}: PropsWithChildren<PaginatedCardListProps>): JSX.Element {
	return (
		<>
			<div className={styles.headingRow}>
				<Heading1 unpadded className={styles.heading}>
					{heading}
				</Heading1>
				{filter}
			</div>
			<CardGroup>{children}</CardGroup>
			<Pagination {...{ makeRoute, ...pagination }} />
		</>
	);
}
