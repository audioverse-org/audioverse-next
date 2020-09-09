import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import React from 'react';

export default function WithFailStates({ getChildren, dependencies }) {
	const router = useRouter();

	if (!router.isFallback && !dependencies) {
		return <ErrorPage statusCode={404} />;
	}

	if (router.isFallback) {
		return <h1>Loading…</h1>;
	}

	return getChildren();
}
