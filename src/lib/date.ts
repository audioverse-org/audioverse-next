import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

/**
 * This takes a GraphQL `RelativeDateTime` and returns a JS Date
 */
export const parseRelativeDate = (date: string): Date | undefined => {
	const matches = date.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
	if (matches) {
		const [, year, month, day, hour, minute] = matches;
		return new Date(+year, +month - 1, +day, +hour, +minute);
	}
};

export const formatLongDate = (date: string | Date): string => {
	return new Date(date).toLocaleString('default', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
};

export const useFormattedLongDateTime = (
	date?: string | Date
): string | undefined => {
	// WORKAROUND: toLocaleString returns different values in SSR vs in browser,
	// causing hydration errors.
	// https://nextjs.org/docs/messages/react-hydration-error
	// https://www.joshwcomeau.com/react/the-perils-of-rehydration/
	const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		setDidMount(true);
	}, []);

	if (!didMount || !date) return;

	return new Date(date).toLocaleString('default', {
		hour: 'numeric',
		minute: 'numeric',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
};

export const formatDateRange = (
	startDate: string,
	endDate: string,
	useLongMonthFormat = false
): string => {
	const monthFormat = useLongMonthFormat ? 'MMMM' : 'MMM';
	const [startYear, startMonth, startDay] = startDate.split('-');
	const [endYear, endMonth, endDay] = endDate.split('-');
	if (startYear !== endYear) {
		return `${dayjs(startDate).format(`${monthFormat} D, YYYY`)} – ${dayjs(
			endDate
		).format(`${monthFormat} D, YYYY`)}`;
	}
	if (startMonth !== endMonth) {
		return `${dayjs(startDate).format(`${monthFormat} D`)} – ${dayjs(
			endDate
		).format(`${monthFormat} D, YYYY`)}`;
	}
	if (startDay !== endDay) {
		return `${dayjs(startDate).format(`${monthFormat} D`)} – ${dayjs(
			endDate
		).format('D, YYYY')}`;
	}
	return `${dayjs(startDate).format(`${monthFormat} D, YYYY`)}`;
};
