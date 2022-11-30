import { ResolvedIntlConfig } from 'react-intl';

const getIntlMessages = jest.fn(
	(languageRoute: string): Promise<ResolvedIntlConfig['messages']> => {
		return Promise.resolve({});
		// return jest.requireActual('../getIntlMessages').default(languageRoute);
	}
);

export default getIntlMessages;
