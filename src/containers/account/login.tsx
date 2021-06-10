import React, { useEffect } from 'react';
import withAuthGuard from '@components/HOCs/withAuthGuard';
import { useRouter } from 'next/router';
import useLanguageRoute from '@lib/useLanguageRoute';

function Login(): JSX.Element {
	const router = useRouter();
	const route = useLanguageRoute();

	useEffect(() => {
		router.push(`/${route}/discover`);
	}, []);

	return <>redirecting...</>;
}

export default withAuthGuard(Login);
