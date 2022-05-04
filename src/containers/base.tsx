import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Script from 'next/script';
import React, { useEffect } from 'react';
import {
	DehydratedState,
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from 'react-query';

import withIntl from '@components/HOCs/withIntl';
import LoadingIndicator from '@components/molecules/loadingIndicator';
import AndGlobalModals from '@components/templates/andGlobalModals';
import AndMiniplayer from '@components/templates/andMiniplayer';
import AndNavigation from '@components/templates/andNavigation';
import AndPlaybackContext from '@components/templates/andPlaybackContext';

export interface IBaseProps {
	disableSidebar?: boolean;
	title?: string;
	description?: string | null;
	canonicalUrl?: string | null;
	dehydratedState?: DehydratedState;
	imageUrl?: string | null;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export const GA_TRACKING_ID = 'GTM-5HNWR6';

function Base<P>({
	Component,
	pageProps,
}: {
	Component: typeof React.Component;
	pageProps: P & IBaseProps;
}): JSX.Element {
	const {
		description,
		disableSidebar,
		title,
		canonicalUrl,
		dehydratedState,
		imageUrl,
	} = pageProps;

	useEffect(() => {
		document.body.classList.toggle('body--no-sidebar', disableSidebar);
	}, [disableSidebar]);
	return (
		<>
			<React.StrictMode>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
					/>
					<meta name="theme-color" content="#efebeb" />
					<link rel="icon" href="/favicon.ico" sizes="any" />
					<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				</Head>
				<Script
					id="google-analytics"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${GA_TRACKING_ID}');
  `,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `<!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) -->`,
					}}
				/>
				<NextSeo
					title={title ? `${title}|AudioVerse` : 'AudioVerse'}
					description={description ? description : ''}
					canonical={canonicalUrl ? canonicalUrl : ''}
					openGraph={{
						url: `${canonicalUrl}`,
						description: `${description}`,
						images: [
							{
								url: `${imageUrl ? imageUrl : '/favicon.svg'}`,
								height: 600,
								width: 800,
								alt: 'preview image',
							},
						],
						site_name: 'AudioVerse',
					}}
					twitter={{
						handle: '@AudioVerse',
						site: '@AudioVerse',
						cardType: 'summary_large_image',
					}}
					facebook={{
						appId: `${process.env.FACEBOOK_APP_ID || ''}`,
					}}
				/>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={dehydratedState}>
						<AndGlobalModals>
							<LoadingIndicator />
							<AndPlaybackContext>
								{disableSidebar ? (
									<Component {...pageProps} />
								) : (
									<AndMiniplayer>
										<AndNavigation>
											<Component {...pageProps} />
										</AndNavigation>
									</AndMiniplayer>
								)}
							</AndPlaybackContext>
						</AndGlobalModals>
					</Hydrate>
				</QueryClientProvider>
			</React.StrictMode>
		</>
	);
}

export default withIntl(Base);
