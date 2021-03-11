import React from 'react';
import TableList from '@components/organisms/tableList';
import { SponsorBooksStaticProps } from '@pages/[language]/sponsors/[id]/books/page/[i]';
import {
	makeAudiobookRoute,
	makeSponsorBooksRoute,
	makeSponsorRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';
import { FormattedMessage } from 'react-intl';
import Pagination from '@components/molecules/pagination';
import withFailStates from '@components/HOCs/withFailStates';

type Props = SponsorBooksStaticProps['props'];

function SponsorBooks({ nodes, data, pagination }: Props): JSX.Element {
	const languageRoute = useLanguageRoute();
	const sponsorImage = data?.sponsor?.imageWithFallback?.url;
	return (
		<>
			{sponsorImage && <img alt={data?.sponsor?.title} src={sponsorImage} />}
			<h1>
				<a href={makeSponsorRoute(languageRoute, data?.sponsor?.id || '')}>
					{data?.sponsor?.title}
				</a>
			</h1>
			<h2>
				<FormattedMessage
					id={'sponsorBooksPage__title'}
					defaultMessage={'Books'}
					description={'Sponsor books page title'}
				/>
			</h2>
			<TableList
				nodes={nodes}
				parseTitle={(n) => n.title}
				makeEntryRoute={(l, n) => makeAudiobookRoute(l, n.id)}
			/>
			<Pagination
				makeRoute={(l, i) =>
					makeSponsorBooksRoute(l, data?.sponsor?.id || '', i)
				}
				{...pagination}
			/>
		</>
	);
}

export default withFailStates(SponsorBooks, ({ nodes }) => !nodes?.length);
