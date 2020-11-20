import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';
import '../styles/styles.scss';

import withIntl from '@components/HOCs/withIntl';
import Header from '@components/organisms/header';

function MyApp<P>({
	Component,
	pageProps,
}: {
	Component: typeof React.Component;
	pageProps: P;
}): JSX.Element {
	return (
		<div className={'template-base'}>
			<Head>
				<title>AudioVerse</title>
			</Head>
			<Header />
			<div className={'template-base__content'}>
				<Component {...pageProps} />
			</div>
		</div>
	);
}

export default withIntl(MyApp);
