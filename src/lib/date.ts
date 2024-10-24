import dayjs from 'dayjs';

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

export const formatLongDateTime = (date: string | Date): string => {
	return dayjs(new Date(date)).format('MMMM D, YYYY, h:mm A');
};

export const formatDateRange = (
	startDate: string,
	endDate: string,
	useLongMonthFormat = false,
): string => {
	const monthFormat = useLongMonthFormat ? 'MMMM' : 'MMM';
	const [startYear, startMonth, startDay] = startDate.split('-');
	const [endYear, endMonth, endDay] = endDate.split('-');
	if (startYear !== endYear) {
		return `${dayjs(startDate).format(`${monthFormat} D, YYYY`)} – ${dayjs(
			endDate,
		).format(`${monthFormat} D, YYYY`)}`;
	}
	if (startMonth !== endMonth) {
		return `${dayjs(startDate).format(`${monthFormat} D`)} – ${dayjs(
			endDate,
		).format(`${monthFormat} D, YYYY`)}`;
	}
	if (startDay !== endDay) {
		return `${dayjs(startDate).format(`${monthFormat} D`)} – ${dayjs(
			endDate,
		).format('D, YYYY')}`;
	}
	return `${dayjs(startDate).format(`${monthFormat} D, YYYY`)}`;
};
