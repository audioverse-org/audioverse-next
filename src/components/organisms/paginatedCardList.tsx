import React, { PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Button from '@components/molecules/button';
import CardGroup from '@components/molecules/cardGroup';
import Pagination from '@components/molecules/pagination';
import { PaginationData } from '@lib/getPaginatedStaticProps';

import IconBack from '../../../public/img/icon-back-light.svg';

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
			<Button
				type="secondary"
				text={
					<FormattedMessage id="paginatedList__back" defaultMessage="Back" />
				}
				Icon={IconBack}
				href={backUrl}
				className={styles.back}
			/>
			<Heading1 className={styles.heading}>{heading}</Heading1>
			<CardGroup>{children}</CardGroup>
			<Pagination {...{ makeRoute, ...pagination }} />
		</>
	);
}
