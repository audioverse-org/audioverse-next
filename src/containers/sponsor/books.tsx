import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import Pagination from '@components/molecules/pagination';
import TableList from '@components/organisms/tableList';
import { GetSponsorBooksPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorBooksRoute } from '@lib/routes';

export type SponsorBooksProps = PaginatedProps<
	NonNullable<GetSponsorBooksPageDataQuery['audiobooks']['nodes']>[0],
	GetSponsorBooksPageDataQuery
>;

function SponsorBooks({
	nodes,
	data,
	pagination,
}: SponsorBooksProps): JSX.Element {
	const sponsorImage = data?.sponsor?.imageWithFallback?.url;
	return (
		<>
			{sponsorImage && (
				<Image
					alt={data?.sponsor?.title}
					src={sponsorImage}
					width={100}
					height={100}
				/>
			)}
			<h1>
				<Link href={data?.sponsor?.canonicalPath as string}>
					<a>{data?.sponsor?.title}</a>
				</Link>
			</h1>
			<h2>
				<FormattedMessage
					id="sponsorBooksPage__title"
					defaultMessage="Books"
					description="Sponsor books page title"
				/>
			</h2>
			<TableList
				nodes={nodes}
				parseTitle={(n) => n.title}
				makeEntryRoute={(l, n) => n.canonicalPath}
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
