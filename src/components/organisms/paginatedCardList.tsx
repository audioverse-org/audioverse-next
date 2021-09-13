import React, { PropsWithChildren } from 'react';

import Heading1 from '@components/atoms/heading1';
import ButtonBack from '@components/molecules/buttonBack';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { PaginationData } from '@lib/getPaginatedStaticProps';

import styles from './paginatedCardList.module.scss';

export interface PaginatedCardListProps {
	pagination: PaginationData;
	backUrl: string;
	heading: string | JSX.Element;
	makeRoute: (languageRoute: string, pageIndex: number) => string;
}

export default function PaginatedCardList({
	backUrl,
	heading,
	children,
	makeRoute,
	pagination,
}: PropsWithChildren<PaginatedCardListProps>): JSX.Element {
	return (
		<>
			<ButtonBack backUrl={backUrl} className={styles.back} />
			<Heading1 className={styles.heading}>{heading}</Heading1>
			<CardGroup>{children}</CardGroup>
			<Pagination {...{ makeRoute, ...pagination }} />
		</>
	);
}
