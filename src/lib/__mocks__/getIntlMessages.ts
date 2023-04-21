import { act } from '@testing-library/react';
import { ResolvedIntlConfig } from 'react-intl';

declare module '~lib/getIntlMessages' {
	export function __awaitIntlMessages(): Promise<
		ResolvedIntlConfig['messages']
	>;
}

export function __awaitIntlMessages() {
	return act(() => jest.mocked(getIntlMessages).mock.results[0]?.value);
}

const getIntlMessages = jest.fn(
	(languageRoute: string): Promise<ResolvedIntlConfig['messages']> => {
		return jest.requireActual('../getIntlMessages').default(languageRoute);
	}
);

export default getIntlMessages;
