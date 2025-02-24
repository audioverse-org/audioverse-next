import {
	doFetchGraphqlBible,
	DoFetchGraphqlBibleQuery,
} from './__generated__/fetchGraphqlBible';

export type GraphqlBible = NonNullable<DoFetchGraphqlBibleQuery['collection']>;

export default async function fetchGraphqlBible(id: string) {
	const { collection } = await doFetchGraphqlBible({ collectionId: id });
	return collection;
}
