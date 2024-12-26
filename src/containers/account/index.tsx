import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import PreferencesForm from '~components/organisms/preferencesForm';
import ProfileForm from '~components/organisms/profileForm';
import Heading1 from '~src/components/atoms/heading1';
import AccountNav from '~src/components/organisms/accountNav';
import AndAuthGuard from '~src/components/templates/andAuthGuard';

function Account() {
	const [tab, setTab] = useState<'profile' | 'preferences'>('profile');
	return (
		<AndAuthGuard>
			<div>
				<Heading1>
					<FormattedMessage
						id="account__heading"
						defaultMessage="Account Settings"
					/>
				</Heading1>
				<AccountNav current={tab} onClick={(tab) => setTab(tab)} />

				{tab === 'profile' ? <ProfileForm /> : <PreferencesForm />}
			</div>
		</AndAuthGuard>
	);
}

export default Account;
