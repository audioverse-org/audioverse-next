import ErrorPage from 'next/error';
import React from 'react';
import { useRouter } from 'next/router';

export default function WithFailStates({ getChildren, dependencies }) {
	const router = useRouter();

	if (!router.isFallback && !dependencies) {
		return <ErrorPage statusCode={404} />;
	}

	return getChildren();
}
