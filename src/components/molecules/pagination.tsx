import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useIntl } from 'react-intl';

import useLanguageRoute from '@lib/useLanguageRoute';

import IconBack from '../../../public/img/icons/icon-back-light.svg';
import IconForward from '../../../public/img/icons/icon-forward-light.svg';

import Button from './button';
import styles from './pagination.module.scss';

export function pagination(
	current: number,
	total: number
): (number | string)[] {
	if (total === 1) return [1];

	const center = [current - 2, current - 1, current, current + 1, current + 2],
		filteredCenter: (number | string)[] = center.filter(
			(p) => p > 1 && p < total
		),
		includeThreeLeft = current === 5,
		includeThreeRight = current === total - 4,
		includeLeftDots = current > 5,
		includeRightDots = current < total - 4;

	if (includeThreeLeft) filteredCenter.unshift(2);
	if (includeThreeRight) filteredCenter.push(total - 1);

	if (includeLeftDots) filteredCenter.unshift('...');
	if (includeRightDots) filteredCenter.push('...');

	return [1, ...filteredCenter, total];
}

const PaginationEntry = ({
	page,
	label,
	makeRoute,
	isActive,
	isOptional,
}: {
	page: number | string;
	label?: string;
	makeRoute?: (languageRoute: string, pageIndex: number) => string;
	isActive?: boolean;
	isOptional?: boolean;
}): JSX.Element => {
	const languageRoute = useLanguageRoute();
	return (
		<li
			className={clsx(
				styles.link,
				isActive && styles.active,
				isOptional && styles.optional
			)}
			data-testid={isActive ? 'active' : ''}
		>
			{Number.isInteger(page) && makeRoute ? (
				<Link href={makeRoute(languageRoute, +page)}>
					<a>{label || page}</a>
				</Link>
			) : (
				label || page
			)}
		</li>
	);
};

export default function Pagination({
	current,
	total,
	makeRoute,
	useInverse = false,
}: {
	current: number;
	total: number;
	makeRoute: (languageRoute: string, pageIndex: number) => string;
	useInverse?: boolean;
}): JSX.Element | null {
	const language = useLanguageRoute();
	const intl = useIntl();
	current = current || 1;

	const pagePrevious = current - 1;
	const pageNext = current + 1;
	const pages = pagination(current, total);
	const buttonType = useInverse ? 'secondaryInverse' : 'secondary';
	const currentIndex = pages.findIndex((p) => p === current);

	if (pages.length <= 1) {
		return null;
	}

	return (
		<ul className={clsx(styles.base, useInverse && styles.inverse)}>
			{current > 1 ? (
				<>
					<Button
						type={buttonType}
						href={makeRoute(language, pagePrevious)}
						IconLeft={IconBack}
						className={clsx(styles.previousButton, styles.mobileButton)}
					/>
					<Button
						type={buttonType}
						href={makeRoute(language, pagePrevious)}
						IconLeft={IconBack}
						text={intl.formatMessage({
							id: 'molecules-pagination__previousLabel',
							defaultMessage: 'Previous',
						})}
						className={styles.previousButton}
					/>
				</>
			) : null}
			{pages.map((p, i) => (
				<PaginationEntry
					page={p}
					key={i}
					makeRoute={makeRoute}
					isActive={p === current}
					isOptional={
						currentIndex - i > 2 ||
						(i - currentIndex > 0 && i > 2 && i < pages.length - 4)
					}
				/>
			))}
			{current < total ? (
				<>
					<Button
						type={buttonType}
						href={makeRoute(language, pageNext)}
						IconLeft={IconForward}
						className={clsx(styles.nextButton, styles.mobileButton)}
					/>
					<Button
						type={buttonType}
						href={makeRoute(language, pageNext)}
						IconLeft={IconForward}
						text={intl.formatMessage({
							id: 'molecules-pagination__nextLabel',
							defaultMessage: 'Next',
						})}
						className={styles.nextButton}
					/>
				</>
			) : null}
		</ul>
	);
}
