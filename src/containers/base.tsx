import {
	DehydratedState,
	Hydrate,
	QueryClientProvider,
} from '@tanstack/react-query';
import Head from 'next/head';
import Script from 'next/script';
import React, { useEffect } from 'react';

import withIntl from '~components/HOCs/withIntl';
import LoadingIndicator from '~components/molecules/loadingIndicator';
import AndGlobalModals from '~components/templates/andGlobalModals';
import AndMiniplayer from '~components/templates/andMiniplayer';
import AndNavigation from '~components/templates/andNavigation';
import AndPlaybackContext from '~components/templates/andPlaybackContext';
import makeQueryClient from '~src/lib/makeQueryClient';

import styles from './base.module.scss';

export interface IBaseProps {
	disableSidebar?: boolean;
	title?: string;
	description?: string | null;
	canonicalUrl?: string | null;
	dehydratedState?: DehydratedState;
}

const queryClient = makeQueryClient();

export const GA_TRACKING_ID = 'GTM-5HNWR6';

function Base<P>({
	Component,
	pageProps,
}: {
	Component: typeof React.Component;
	pageProps: P & IBaseProps;
}): JSX.Element {
	const { description, disableSidebar, title, canonicalUrl, dehydratedState } =
		pageProps;

	useEffect(() => {
		document.body.classList.toggle('body--no-sidebar', disableSidebar);
	}, [disableSidebar]);

	return (
		<div className={styles.base}>
			<React.StrictMode>
				<Head>
					{/* <script
						dangerouslySetInnerHTML={{
							__html: `
              !function(){
                var analytics=window.analytics=window.analytics||[];
                if(!analytics.initialize)
                  if(analytics.invoked)
                    window.console && console.error && console.error("Segment snippet included twice.");
                  else{
                    analytics.invoked=!0;
                    analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];
                    analytics.factory=function(e){
                      return function(){
                        if(window.analytics.initialized)
                          return window.analytics[e].apply(window.analytics,arguments);
                        var i=Array.prototype.slice.call(arguments);
                        i.unshift(e);
                        analytics.push(i);
                        return analytics;
                      };
                    };
                    for(var i=0;i<analytics.methods.length;i++){
                      var key=analytics.methods[i];
                      analytics[key]=analytics.factory(key);
                    }
                    analytics.load=function(key,i){
                      var t=document.createElement("script");
                      t.type="text/javascript";
                      t.async=!0;
                      t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
                      var n=document.getElementsByTagName("script")[0];
                      n.parentNode.insertBefore(t,n);
                      analytics._loadOptions=i;
                    };
                    analytics._writeKey="vkWzScRn3eSetN6cMhGhrzEuo4GaBJ0v";
                    analytics.SNIPPET_VERSION="4.16.1";
                    analytics.load("vkWzScRn3eSetN6cMhGhrzEuo4GaBJ0v");
                    analytics.page();
                  }
              }();
            `,
						}}
					/> */}
					{/* eslint-disable-next-line @calm/react-intl/missing-formatted-message */}
					<title>{title ? `${title} | AudioVerse` : 'AudioVerse'}</title>
					{description && <meta name="description" content={description} />}
					{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
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
		</div>
	);
}

export default withIntl(Base);
