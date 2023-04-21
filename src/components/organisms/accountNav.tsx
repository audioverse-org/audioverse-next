import React from 'react';
import { FormattedMessage } from 'react-intl';

import Mininav from '~components/molecules/mininav';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';

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
					url: root.lang(languageRoute).account.profile.get(),
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
					url: root.lang(languageRoute).account.preferences.get(),
					isActive: current === 'preferences',
				},
			]}
		/>
	);
}
