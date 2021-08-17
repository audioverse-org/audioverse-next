import dayjs from 'dayjs';

export const formatLongDate = (date: string): string => {
	return new Date(date).toLocaleString('default', {
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
