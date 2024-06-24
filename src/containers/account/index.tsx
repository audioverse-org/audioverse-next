import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import PreferencesForm from '~components/organisms/preferencesForm';
import ProfileForm from '~components/organisms/profileForm';
import Heading1 from '~src/components/atoms/heading1';
import withAuthGuard from '~src/components/HOCs/withAuthGuard';
import AccountNav from '~src/components/organisms/accountNav';

function Account() {
	const [tab, setTab] = useState<'profile' | 'preferences'>('profile');
	return (
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
	);
}

export default withAuthGuard(Account);
