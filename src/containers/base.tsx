import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import Head from 'next/head';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DehydratedState, Hydrate } from 'react-query';
import 'video.js/dist/video-js.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import withIntl from '@components/HOCs/withIntl';
import LoadingIndicator from '@components/molecules/loadingIndicator';
import AndGlobalModals from '@components/templates/andGlobalModals';
import AndMiniplayer from '@components/templates/andMiniplayer';
import AndNavigation from '@components/templates/andNavigation';

export interface IBaseProps {
	disableSidebar?: boolean;
	title?: string;
	description?: string | null;
	canonicalUrl?: string | null;
	dehydratedState?: DehydratedState;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const muiTheme = createTheme({
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
	pageProps: P & IBaseProps;
}): JSX.Element {
	const { description, disableSidebar, title, canonicalUrl, dehydratedState } =
		pageProps;
	return (
		<>
			<React.StrictMode>
				<Head>
					<title>{title ? `${title} | ` : ''}AudioVerse</title>
					{description && <meta name="description" content={description} />}
					{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=0, viewport-fit=cover"
					/>
					<meta name="theme-color" content="#efebeb" />
					<link rel="icon" href="/favicon.ico" sizes="any" />
					<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				</Head>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={muiTheme}>
						<Hydrate state={dehydratedState}>
							<AndGlobalModals>
								<LoadingIndicator />
								{disableSidebar ? (
									<Component {...pageProps} />
								) : (
									<AndMiniplayer>
										<AndNavigation>
											<Component {...pageProps} />
										</AndNavigation>
									</AndMiniplayer>
								)}
							</AndGlobalModals>
						</Hydrate>
					</ThemeProvider>
				</QueryClientProvider>
			</React.StrictMode>
			<ToastContainer />
		</>
	);
}

export default withIntl(Base);
