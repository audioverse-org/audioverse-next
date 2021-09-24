import React from 'react';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import CardRecording from '@components/molecules/card/recording';
import CardGroup from '@components/molecules/cardGroup';
import LibraryNav from '@components/organisms/libraryNav';
import {
	GetLibraryHistoryDataQueryVariables,
	Language,
	useGetLibraryHistoryDataQuery,
} from '@lib/generated/graphql';

import baseStyles from './base.module.scss';
import LibraryLoggedOut from './loggedOut';

export const getLibraryHistoryDataDefaultVariables = (
	language: Language
): GetLibraryHistoryDataQueryVariables => {
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
	const { data } = useGetLibraryHistoryDataQuery(
		getLibraryHistoryDataDefaultVariables(language)
	);

	return (
		<div className={baseStyles.wrapper}>
			<LibraryNav currentNavHref="history" />

			<CardGroup>
				{(data?.me?.user.downloadHistory.nodes || []).map(({ recording }) => (
					<CardRecording recording={recording} key={recording.canonicalPath} />
				))}
			</CardGroup>
		</div>
	);
}

export default withAuthGuard(LibraryHistory, LibraryLoggedOut);
