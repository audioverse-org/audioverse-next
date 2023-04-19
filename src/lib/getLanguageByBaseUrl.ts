import { LanguageConfiguration, LANGUAGES } from '@lib/constants';

export default function getLanguageByBaseUrl(
	base_url: string,
	fallback: string | null = null
): LanguageConfiguration | undefined {
	const values = Object.values(LANGUAGES);

	return (
		values.find((l) => l.base_urls.includes(base_url)) ||
		values.find((l) => l.base_urls.includes(fallback || ''))
	);
}
