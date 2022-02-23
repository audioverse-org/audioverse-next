import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
	render() {
		return (
			<Html lang={this.props.__NEXT_DATA__.query.language as string}>
				<Head>
					<link rel="stylesheet" href="https://use.typekit.net/bgc2sqi.css" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
