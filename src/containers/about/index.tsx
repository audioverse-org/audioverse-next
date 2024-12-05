import React from 'react';

import Heading1 from '~components/atoms/heading1';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import AboutNav from '~components/organisms/aboutNav';
import AndFailStates from '~src/components/templates/andFailStates';
import { Must } from '~src/types/types';

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

const WithFailStates = (props: Parameters<typeof About>[0]) => (
	<AndFailStates
		Component={About}
		componentProps={props}
		options={{ should404: ({ page }) => !page }}
	/>
);
export default WithFailStates;
