import React from 'react';
import { FormattedMessage } from 'react-intl';

import Mininav from '@components/molecules/mininav';
import {
	makeAccountPreferencesRoute,
	makeAccountProfileRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

type Props = {
	current: 'profile' | 'preferences';
};

export default function AccountNav({ current }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	return (
		<Mininav
			items={[
				{
					label: (
						<FormattedMessage
							id="accountNav__profile"
							defaultMessage="Profile"
						/>
					),
					url: makeAccountProfileRoute(languageRoute),
					isActive: current === 'profile',
				},
				{
					label: (
						<FormattedMessage
							id="accountNav__audiopreferences"
							defaultMessage="Preferences"
						/>
					),
					url: makeAccountPreferencesRoute(languageRoute),
					isActive: current === 'preferences',
				},
			]}
		/>
	);
}
