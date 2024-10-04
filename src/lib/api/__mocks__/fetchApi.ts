import { fetchApi as realFetchApi } from '~src/lib/api/fetchApi';

declare module '~lib/api/fetchApi' {
	export const __apiDocumentMock: (document: string) => jest.Mock;
	export const __clearApiMock: () => void;
}

const __documentMocks = new Map<string, jest.Mock>();

const impl: typeof realFetchApi = <TData>(
	query: string,
	{ variables = {} } = {},
): Promise<TData> => {
	return __documentMocks.get(query)?.(variables) || null;
};

export const fetchApi = jest.fn(impl);

export const __apiDocumentMock = (document: string) => {
	if (!__documentMocks.has(document)) {
		__documentMocks.set(document, jest.fn());
	}

	return __documentMocks.get(document);
};

export const __clearApiMock = () => __documentMocks.clear();

afterEach(() => {
	__clearApiMock();
	fetchApi.mockReset();
	fetchApi.mockImplementation(impl);
});
