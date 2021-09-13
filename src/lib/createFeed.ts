import { WriteFeedFileFragment } from '@lib/generated/graphql';
import getIntl from '@lib/getIntl';
import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';
import writeFeedFile from '@lib/writeFeedFile';

export async function createFeed(
	prettyIdentifier: string | undefined,
	params: { language: string },
	recordings: WriteFeedFileFragment[],
	languageRelativePath: string
): Promise<string | null> {
	const { language: languageRoute } = params;
	const languageName = getLanguageByBaseUrl(languageRoute)?.display_name;

	if (!prettyIdentifier || !recordings || !languageName) return null;

	const intl = getIntl(languageRoute);

	// TODO: Switch to automatic ID generation:
	// https://formatjs.io/docs/getting-started/message-extraction/#automatic-id-generation
	const title = intl.formatMessage(
		{
			id: 'feed-title',
			defaultMessage: '{identifier} | AudioVerse {lang}',
			description: 'Generic feed title',
		},
		{
			identifier: prettyIdentifier,
			lang: languageName,
		}
	);

	const webPath = `/${languageRoute}/${languageRelativePath}`;

	await writeFeedFile({
		recordings,
		projectRelativePath: webPath,
		title,
	});

	return webPath;
}
