import React from 'react';
import { FormattedMessage } from 'react-intl';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import LibraryError from '@components/organisms/libraryError';
import LibraryNav from '@components/organisms/libraryNav';
import {
	GetLibraryHistoryPageDataQueryVariables,
	Language,
	useGetLibraryHistoryPageDataQuery,
} from '@lib/generated/graphql';

import baseStyles from './base.module.scss';
import LibraryLoggedOut from './loggedOut';

export const getLibraryHistoryPageDataDefaultVariables = (
	language: Language
): GetLibraryHistoryPageDataQueryVariables => {
	return {
		language,
		first: 25,
		offset: 0,
	};
};

type Props = {
	language: Language;
};

function LibraryHistory({ language }: Props): JSX.Element {
	const { data } = useGetLibraryHistoryPageDataQuery(
		getLibraryHistoryPageDataDefaultVariables(language)
	);

	const historyItems = data?.me?.user.downloadHistory.nodes || [];

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref="history" />

			{historyItems.length ? (
				<CardGroup>
					{historyItems.map(({ recording }) => (
						<CardRecording
							recording={recording}
							key={recording.canonicalPath}
						/>
					))}
				</CardGroup>
			) : (
				<LibraryError
					title={
						<FormattedMessage
							id="libraryHistory__emptyHeading"
							defaultMessage="You haven’t listened to any items yet"
						/>
					}
					message={
						<FormattedMessage
							id="libraryHistory__emptyCopy"
							defaultMessage="Find something to listen to on the Discover page."
						/>
					}
				/>
			)}
		</div>
	);
}

export default withAuthGuard(LibraryHistory, LibraryLoggedOut);
