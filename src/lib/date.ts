export const formatLongDate = (date: string): string => {
	return new Date(date).toLocaleString('default', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
};
