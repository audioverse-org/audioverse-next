import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import _ from 'lodash';
import Head from 'next/head';
import React from 'react';
import '../styles/styles.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import 'video.js/dist/video-js.css';
import { toast, ToastContainer } from 'react-toastify';

import withIntl from '@components/HOCs/withIntl';
import Header from '@components/organisms/header';

import styles from './_app.module.scss';

import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const muiTheme = createMuiTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
	},
	props: {
		MuiButtonBase: {
			disableRipple: true,
		},
	},
});

toast.configure();

function MyApp<P>({
	Component,
	pageProps,
}: {
	Component: typeof React.Component;
	pageProps: P & { disableSidebar?: boolean };
}): JSX.Element {
	const disableSidebar = pageProps.disableSidebar;
	return (
		<>
			<div className={styles.base}>
				<React.StrictMode>
					<Head>
						<title>AudioVerse</title>
					</Head>
					<QueryClientProvider client={queryClient}>
						<ThemeProvider theme={muiTheme}>
							<Hydrate state={_.get(pageProps, 'dehydratedState')}>
								{!disableSidebar && (
									<div className={styles.header}>
										<Header />
									</div>
								)}
								<div className={styles.content}>
									<Component {...pageProps} />
								</div>
							</Hydrate>
						</ThemeProvider>
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
