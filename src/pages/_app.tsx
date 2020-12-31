import _ from 'lodash';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';
import '../styles/styles.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import 'video.js/dist/video-js.css';

import withIntl from '@components/HOCs/withIntl';
import Header from '@components/organisms/header';

const queryClient = new QueryClient();

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
			<QueryClientProvider client={queryClient}>
				<Hydrate state={_.get(pageProps, 'dehydratedState')}>
					<Header />
					<div className={'template-base__content'}>
						<Component {...pageProps} />
					</div>
					{/*<script src="//vjs.zencdn.net/6.7/video.min.js" />*/}
				</Hydrate>
			</QueryClientProvider>
		</div>
	);
}

export default withIntl(MyApp);
