import React from 'react';
import { FormattedMessage } from 'react-intl';

import { logout } from '@lib/api';

export default function Logout(): JSX.Element {
	logout();

	return (
		<FormattedMessage
			id="logout__successMessage"
			defaultMessage="Logged out"
			description="Logged out message"
		/>
	);
}
