import SponsorAlbums, { SponsorAlbumsProps } from '@containers/sponsor/albums';
import {
	getSponsorAlbumsPageData,
	getSponsorAlbumsPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeSponsorAlbumsRoute } from '@lib/routes';

export default SponsorAlbums;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string; i: string };
}): Promise<StaticProps<SponsorAlbumsProps>> {
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
