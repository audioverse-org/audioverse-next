import {
	doFetchGraphqlVersion,
	DoFetchGraphqlVersionQuery,
} from './__generated__/fetchGraphqlVersion';

export type GraphqlVersion = NonNullable<
	DoFetchGraphqlVersionQuery['collection']
>;

export default async function fetchGraphqlVersion(
	id: string,
): Promise<GraphqlVersion | null> {
	const { collection } = await doFetchGraphqlVersion({ collectionId: id });
	return collection;
}
