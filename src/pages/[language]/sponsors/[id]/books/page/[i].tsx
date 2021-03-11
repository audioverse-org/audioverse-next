import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import {
	getSponsorBooksPageData,
	GetSponsorBooksPageDataQuery,
	getSponsorBooksPathsData,
} from '@lib/generated/graphql';
import SponsorBooks from '@containers/sponsor/books';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSponsorBooksRoute } from '@lib/routes';

export default SponsorBooks;

type Book = NonNullable<GetSponsorBooksPageDataQuery['audiobooks']['nodes']>[0];
export type SponsorBooksStaticProps = PaginatedStaticProps<
	GetSponsorBooksPageDataQuery,
	Book
>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<SponsorBooksStaticProps> {
	const { id } = params;
	return getPaginatedStaticProps(
		params,
		(variables) => getSponsorBooksPageData({ ...variables, id }),
		(d) => d.audiobooks.nodes,
		(d) => d.audiobooks.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSponsorBooksPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorBooksRoute(l, n.id)
	);
}
