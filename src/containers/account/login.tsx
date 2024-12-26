import React from 'react';

import AndAuthGuard from '~src/components/templates/andAuthGuard';

import LoginRedirect from './loginRedirect';

const Login = () => (
	<AndAuthGuard>
		<LoginRedirect />
	</AndAuthGuard>
);

export default Login;
