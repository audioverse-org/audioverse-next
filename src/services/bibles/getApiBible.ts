import {
	getApiBible as _getApiBible,
	GetApiBibleQuery,
} from './__generated__/getApiBible';

export type ApiBible = NonNullable<GetApiBibleQuery['collection']>;

export default async function getApiBible(id: string) {
	const { collection } = await _getApiBible({ collectionId: id });
	return collection;
}
