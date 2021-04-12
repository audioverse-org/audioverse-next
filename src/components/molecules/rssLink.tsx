import Head from 'next/head';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function RssLink({
	href,
}: {
	href: string | null;
}): JSX.Element {
	return (
		<>
			{href && (
				<>
					<Head>
						{/* TODO: Do we need to set the title attribute more specifically? */}
						<link type="application/rss+xml" rel="alternate" href={href} title={"RSS feed"} />
					</Head>
					<a href={href} target={'_blank'} rel={'noreferrer noopener'}>
						<FormattedMessage
							id="rssLink__label"
							defaultMessage="RSS"
							description="RSS link label"
						/>
					</a>
				</>
			)}
		</>
	);
}
