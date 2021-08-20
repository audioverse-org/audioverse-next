import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import _ from 'lodash';
import Head from 'next/head';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import 'video.js/dist/video-js.css';
import { toast, ToastContainer } from 'react-toastify';

import withIntl from '@components/HOCs/withIntl';
import 'react-toastify/dist/ReactToastify.css';
import AndMiniplayer from '@components/templates/andMiniplayer';
import AndNavigation from '@components/templates/andNavigation';

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

function Base<P>({
	Component,
	pageProps,
}: {
	Component: typeof React.Component;
	pageProps: P & { disableSidebar?: boolean; title?: string };
}): JSX.Element {
	const { disableSidebar, title } = pageProps;
	return (
		<>
			<React.StrictMode>
				<Head>
					<title>{title ? `${title} | ` : ''}AudioVerse</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=0"
					></meta>
				</Head>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={muiTheme}>
						<Hydrate state={_.get(pageProps, 'dehydratedState')}>
							{disableSidebar ? (
								<Component {...pageProps} />
							) : (
								<AndMiniplayer>
									<AndNavigation>
										<Component {...pageProps} />
									</AndNavigation>
								</AndMiniplayer>
							)}
						</Hydrate>
					</ThemeProvider>
				</QueryClientProvider>
			</React.StrictMode>
			<ToastContainer />
		</>
	);
}

export default withIntl(Base);
