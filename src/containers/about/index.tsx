import React from 'react';

import Heading1 from '~components/atoms/heading1';
import withFailStates from '~components/HOCs/withFailStates';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import AboutNav from '~components/organisms/aboutNav';

import { GetAboutPageDataQuery } from './__generated__';
import styles from './index.module.scss';

export type AboutProps = GetAboutPageDataQuery;

function About({ page: { body, title, slug } }: Must<AboutProps>): JSX.Element {
	return (
		<>
			<AboutNav current={slug} />
			<Heading1>{title}</Heading1>
			<ContentWidthLimiter>
				<div
					className={styles.body}
					dangerouslySetInnerHTML={{ __html: body }}
				/>
			</ContentWidthLimiter>
		</>
	);
}

export default withFailStates(About, { useShould404: ({ page }) => !page });
