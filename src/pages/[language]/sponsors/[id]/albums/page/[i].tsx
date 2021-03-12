import SponsorAlbums from '@containers/sponsor/albums';
import {
	getPaginatedStaticProps,
	PaginatedStaticProps,
} from '@lib/getPaginatedStaticProps';
import {
	getSponsorAlbumsPageData,
	GetSponsorAlbumsPageDataQuery,
	getSponsorAlbumsPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSponsorAlbumsRoute } from '@lib/routes';

export default SponsorAlbums;

type Album = NonNullable<
	GetSponsorAlbumsPageDataQuery['musicAlbums']['nodes']
>[0];
export type SponsorSongsStaticProps = PaginatedStaticProps<
	GetSponsorAlbumsPageDataQuery,
	Album
>;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<SponsorSongsStaticProps> {
	const { id } = params;
	return getPaginatedStaticProps(
		params,
		(vars) => getSponsorAlbumsPageData({ id, ...vars }),
		(d) => d.musicAlbums.nodes,
		(d) => d.musicAlbums.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSponsorAlbumsPathsData,
		(d) => d.sponsors.nodes,
		(l, n) => makeSponsorAlbumsRoute(l, n.id)
	);
}
