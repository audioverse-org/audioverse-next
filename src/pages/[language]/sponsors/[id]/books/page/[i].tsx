import SponsorBooks, { SponsorBooksProps } from '@containers/sponsor/books';
import {
	getSponsorBooksPageData,
	getSponsorBooksPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorBooksRoute } from '@lib/routes';

export default SponsorBooks;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<SponsorBooksProps>> {
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
