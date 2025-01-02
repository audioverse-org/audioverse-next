export const getBibleAcronym = (title: string) => {
	if (!title.includes('(')) {
		return title
			.split(' ')
			.map((word) => word[0])
			.join('');
	}
	const match = title.match(/(.*?)\s*\(.*?\)/); // Match text up to parenthesis
	const acronym = match
		? match[1]
				.split(' ')
				.map((word) => word[0])
				.join('')
		: '';
	const parenthesisMatch = title.match(/\((.*?)\)/);
	const parenthesisContent = parenthesisMatch ? parenthesisMatch[1] : ''; // Get content inside parenthesis
	return acronym + (parenthesisContent ? ` (${parenthesisContent})` : ''); // Combine acronym with content
};
