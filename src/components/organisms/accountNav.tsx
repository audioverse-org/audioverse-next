import React from 'react';
import { FormattedMessage } from 'react-intl';

import Mininav from '~components/molecules/mininav';

type Props = {
	current: 'profile' | 'preferences';
	onClick: (id: 'profile' | 'preferences') => void;
};

export default function AccountNav({ current, onClick }: Props): JSX.Element {
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
					isActive: current === 'profile',
					onClick: () => onClick('profile'),
				},
				{
					id: 'preferences',
					label: (
						<FormattedMessage
							id="accountNav__audiopreferences"
							defaultMessage="Preferences"
						/>
					),
					isActive: current === 'preferences',
					onClick: () => onClick('preferences'),
				},
			]}
		/>
	);
}
