import { Masonry } from 'masonic';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Alert from '@components/atoms/alert';
import Heading2 from '@components/atoms/heading2';
import LineHeading from '@components/atoms/lineHeading';
import Button from '@components/molecules/button';
import CardFavorite from '@components/molecules/card/favorite';
import LibraryNav from '@components/organisms/libraryNav';
import {
	GetLibraryDataQueryVariables,
	Language,
	useGetLibraryDataQuery,
} from '@lib/generated/graphql';
import { makeRegisterRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './index.module.scss';

export const getLibraryDataDefaultVariables = (
	language: Language
): GetLibraryDataQueryVariables => {
	return {
		language,
		first: 25,
		offset: 0,
		groupSequences: true,
	};
};

export type LibraryProps = {
	language: Language;
};

function Library({ language }: LibraryProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const { data } = useGetLibraryDataQuery(
		getLibraryDataDefaultVariables(language)
	);

	const loggedIn = true;

	if (!loggedIn) {
		return (
			<div className={styles.wrapper}>
				<LibraryNav currentNavHref={null} disabled />
				<Alert className={styles.membersOnlyAlert}>
					<Heading2 className={styles.membersOnlyHeading}>
						<FormattedMessage
							id="library__membersOnlyHeading"
							defaultMessage="Member-only feature"
						/>
					</Heading2>
					<p className={styles.membersOnlyCopy}>
						<FormattedMessage
							id="library__membersOnlyCopy"
							defaultMessage="Login or create an account to access the Library features."
						/>
					</p>
					<Button
						type="super"
						text={
							<FormattedMessage
								id="library__membersOnlyCta"
								defaultMessage="Create account or Login"
							/>
						}
						href={makeRegisterRoute(languageRoute)}
					/>
				</Alert>
			</div>
		);
	}
	return (
		<div className={styles.wrapper}>
			<LibraryNav currentNavHref="" />
			<LineHeading>
				<FormattedMessage
					id="library__startedHeading"
					defaultMessage="Started"
				/>
			</LineHeading>

			<Masonry
				items={data?.me?.user.favorites.nodes || []}
				render={({ data }) => <CardFavorite favorite={data} />}
				columnGutter={20}
				columnWidth={300}
				className={styles.grid}
			/>
		</div>
	);
}

export default Library;
