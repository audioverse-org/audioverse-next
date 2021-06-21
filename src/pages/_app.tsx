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
import 'react-toastify/dist/ReactToastify.css';
import AndMiniplayer from '@components/templates/andMiniplayer';
import AndSidebar from '@components/templates/andSidebar';

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
			<React.StrictMode>
				<Head>
					<title>AudioVerse</title>
				</Head>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={muiTheme}>
						<Hydrate state={_.get(pageProps, 'dehydratedState')}>
							{disableSidebar ? (
								<Component {...pageProps} />
							) : (
								<AndSidebar>
									<AndMiniplayer>
										<Component {...pageProps} />
									</AndMiniplayer>
								</AndSidebar>
							)}
						</Hydrate>
					</ThemeProvider>
				</QueryClientProvider>
			</React.StrictMode>
			<ToastContainer />
		</>
	);
}

export default withIntl(MyApp);
