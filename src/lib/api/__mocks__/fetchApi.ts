import { fetchApi as realFetchApi } from '~src/lib/api/fetchApi';
import { filterExpectations } from '~src/lib/test/expectations';

type Variables = Record<string, unknown>;
type Expectation = [string, Variables];
type Options = {
	data: unknown;
	document: string;
	variables?: Variables;
};

declare module '~lib/api/fetchApi' {
	export const __apiMockResolvedValue: (options: Options) => void;
	export const __apiMockResolvedValueOnce: (options: Options) => void;
	export const __apiMockReturnValue: (options: Options) => void;
	export const __apiMockReturnValueOnce: (options: Options) => void;
	export const __clearApiMock: () => void;
}

const __returnValues = new Map<Expectation, unknown>();
const __returnValuesOnce = new Map<Expectation, unknown>();

export const __clearApiMock = () => {
	__returnValues.clear();
	__returnValuesOnce.clear();
};

const getMatch = (
	expectations: Expectation[],
	document: string,
	variables: Variables
) => {
	const matches = filterExpectations([document, variables], expectations);

	return matches[matches.length - 1];
};

const implementation: typeof realFetchApi = <TData>(
	query: string,
	{ variables = {} } = {}
): Promise<TData> => {
	const resolvedValueOnceMatch = getMatch(
		Array.from(__returnValuesOnce.keys()),
		query,
		variables
	);

	if (resolvedValueOnceMatch) {
		const resolvedValueOnce = __returnValuesOnce.get(resolvedValueOnceMatch);

		__returnValuesOnce.delete(resolvedValueOnceMatch);

		return resolvedValueOnce as Promise<TData>;
	}

	const resolvedValueMatch = getMatch(
		Array.from(__returnValues.keys()),
		query,
		variables
	);

	const resolvedValue = __returnValues.get(resolvedValueMatch);

	return resolvedValue as Promise<TData>;
};

export const fetchApi = jest.fn(implementation);

export const __apiMockResolvedValue = ({
	data,
	document,
	variables = expect.anything(),
}: Options) => {
	__returnValues.set([document, variables], Promise.resolve(data));
};

export const __apiMockResolvedValueOnce = ({
	data,
	document,
	variables = expect.anything(),
}: Options) => {
	__returnValuesOnce.set([document, variables], Promise.resolve(data));
};

export const __apiMockReturnValue = ({
	data,
	document,
	variables = expect.anything(),
}: Options) => {
	__returnValues.set([document, variables], data);
};

export const __apiMockReturnValueOnce = ({
	data,
	document,
	variables = expect.anything(),
}: Options) => {
	__returnValuesOnce.set([document, variables], data);
};

afterEach(() => {
	__clearApiMock();
	fetchApi.mockReset();
	fetchApi.mockImplementation(implementation);
});
