import React from 'react';
import { FormattedMessage } from 'react-intl';

import Alert from '@components/atoms/alert';
import Heading1 from '@components/atoms/heading1';
import Heading2 from '@components/atoms/heading2';
import Button from '@components/molecules/button';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import { GetNotFoundPageDataQuery } from '@lib/generated/graphql';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './notFound.module.scss';

export type NotFoundProps = GetNotFoundPageDataQuery;

export default function NotFound({ recordings }: NotFoundProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	return (
		<>
			<Alert className={styles.alert}>
				<Heading1 className={styles.heading}>
					<FormattedMessage id="notFound__header" defaultMessage="Sorry!" />
				</Heading1>
				<Heading2>
					<FormattedMessage
						id="notFound__subheader"
						defaultMessage="We couldn’t find that page"
					/>
				</Heading2>
				<p className={styles.copy}>
					<FormattedMessage
						id="notFound__message"
						defaultMessage="The link might be broken, non-existent, or typed incorrectly."
					/>
				</p>
				<Button
					type="super"
					text={
						<FormattedMessage
							id="notFound__toDiscover"
							defaultMessage="Go back to Discover"
						/>
					}
					href={`/${languageRoute}/discover`}
				/>
			</Alert>
			<Heading2>
				<FormattedMessage
					id="notFound__suggestionsHeader"
					defaultMessage="Take a listen to one of these instead"
				/>
			</Heading2>
			<CardGroup>
				{recordings.nodes?.map((recording) => (
					<CardRecording recording={recording} key={recording.canonicalPath} />
				))}
			</CardGroup>
		</>
	);
}
