import React from 'react';
import { FormattedMessage } from 'react-intl';

import Mininav from '@components/molecules/mininav';
import useLanguageRoute from '@lib/useLanguageRoute';
import { makeAccountProfileRoute } from '@lib/routes/makeAccountProfileRoute';
import { makeAccountPreferencesRoute } from '@lib/routes/makeAccountPreferencesRoute';

type Props = {
	current: 'profile' | 'preferences';
};

export default function AccountNav({ current }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	return (
		<Mininav
			items={[
				{
					id: 'profile',
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
					id: 'preferences',
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
