import PropTypes from 'prop-types';
import React from 'react';
import '../styles/globals.css';
import '../styles/styles.scss';

import withIntl from '@components/HOCs/withIntl';

function MyApp<P>({
	Component,
	pageProps,
}: {
	Component: typeof React.Component;
	pageProps: P;
}): JSX.Element {
	return (
		<div className={'template-base'}>
			<header className={'template-base__header'}>
				<h1>AudioVerse</h1>
			</header>
			<div className={'template-base__content'}>
				<Component {...pageProps} />
			</div>
		</div>
	);
}

MyApp.propTypes = {
	Component: React.Component,
	pageProps: PropTypes.object,
};

export default withIntl(MyApp);
