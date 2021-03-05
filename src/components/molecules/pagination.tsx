import React from 'react';

import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './pagination.module.scss';

export function pagination(
	current: number,
	total: number
): (number | string)[] {
	if (!current) throw Error('Current page number required');

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
	className,
}: {
	page: number | string;
	label?: string;
	makeRoute?: (languageRoute: string, pageIndex: number) => string;
	className?: string;
}): JSX.Element => {
	const languageRoute = useLanguageRoute();
	return (
		<li className={`${className} ${styles.link}`}>
			{Number.isInteger(page) && makeRoute ? (
				<a href={makeRoute(languageRoute, +page)}>{label || page}</a>
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
}: {
	current: number;
	total: number;
	makeRoute: (languageRoute: string, pageIndex: number) => string;
}): JSX.Element {
	current = current || 1;

	const pagePrevious = current - 1;
	const pageNext = current + 1;
	const pages = pagination(current, total);

	return (
		<ul className={styles.base}>
			{current > 1 ? <PaginationEntry page={pagePrevious} label={'<'} /> : null}
			{pages.map((p, i) => (
				<PaginationEntry
					page={p}
					key={i}
					makeRoute={makeRoute}
					className={p === current ? styles.active : ''}
				/>
			))}
			{current < total ? (
				<PaginationEntry page={pageNext} label={'>'} makeRoute={makeRoute} />
			) : null}
		</ul>
	);
}
