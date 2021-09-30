import Head from 'next/head';
import React from 'react';
import { useIntl } from 'react-intl';

export default function RssAlternate({ url }: { url: string }): JSX.Element {
	const intl = useIntl();
	return (
		<Head>
			<link
				type="application/rss+xml"
				rel="alternate"
				href={url}
				title={intl.formatMessage({
					id: 'rssAlternate__title',
					defaultMessage: 'RSS feed',
				})}
			/>
		</Head>
	);
}
