import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';
import '../styles/styles.scss';
import 'video.js/dist/video-js.css';

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
				{/*<link href="//vjs.zencdn.net/6.7/video-js.min.css" rel="stylesheet" />*/}
			</Head>
			<Header />
			<div className={'template-base__content'}>
				<Component {...pageProps} />
			</div>
			{/*<script src="//vjs.zencdn.net/6.7/video.min.js" />*/}
		</div>
	);
}

export default withIntl(MyApp);
