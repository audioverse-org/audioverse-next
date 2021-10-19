import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useLogout } from '@lib/api';

export default function Logout(): JSX.Element {
	useLogout();

	return (
		<FormattedMessage
			id="logout__successMessage"
			defaultMessage="Logged out"
			description="Logged out message"
		/>
	);
}
