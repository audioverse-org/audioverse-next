import _ from 'lodash';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';
import '../styles/styles.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import 'video.js/dist/video-js.css';
import { toast, ToastContainer } from 'react-toastify';

import withIntl from '@components/HOCs/withIntl';
import Header from '@components/organisms/header';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

toast.configure();

function MyApp<P>({
	Component,
	pageProps,
}: {
	Component: typeof React.Component;
	pageProps: P;
}): JSX.Element {
	return (
		<>
			<div className={'template-base'}>
				<React.StrictMode>
					<Head>
						<title>AudioVerse</title>
					</Head>
					<QueryClientProvider client={queryClient}>
						<Hydrate state={_.get(pageProps, 'dehydratedState')}>
							<Header />
							<div className={'template-base__content'}>
								<Component {...pageProps} />
							</div>
						</Hydrate>
					</QueryClientProvider>
				</React.StrictMode>
			</div>
			<ToastContainer />
			{/* Go to www.addthis.com/dashboard to customize your tools */}
			<script
				type="text/javascript"
				src="//s7.addthis.com/js/300/addthis_widget.js#pubid=audioverse"
				defer
			/>
		</>
	);
}

export default withIntl(MyApp);
