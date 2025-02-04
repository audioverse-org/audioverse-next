import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import { GTM_ID } from '~src/containers/base';

class MyDocument extends Document {
	render() {
		return (
			<Html lang={this.props.__NEXT_DATA__.query.language as string}>
				<Head>
					<link rel="stylesheet" href="https://use.typekit.net/vgz0bjm.css" />
				</Head>
				<body>
					<Main />
					<NextScript />
					<noscript
						dangerouslySetInnerHTML={{
							__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
						}}
					/>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
