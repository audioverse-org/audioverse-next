import { ResolvedIntlConfig } from 'react-intl';

type GetIntlMessages = (
	languageRoute: string
) => Promise<ResolvedIntlConfig['messages']>;

const getIntlMessages = vi.fn(
	async (languageRoute: string): Promise<ResolvedIntlConfig['messages']> => {
		const actual = await vi.importActual<{
			default: GetIntlMessages;
		}>('../getIntlMessages');

		return actual.default(languageRoute);
	}
);

export default getIntlMessages;
