import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import SearchPersons, { SearchPersonsProps } from '@containers/search/persons';
import { getSearchResultsPersons } from '@containers/search/persons.gql';
import { storeRequest } from '@lib/api/storeRequest';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default SearchPersons;

export async function getServerSideProps({
	req,
	params,
	query,
}: GetServerSidePropsContext<{
	language: string;
	i: string;
}>): Promise<GetServerSidePropsResult<SearchPersonsProps>> {
	storeRequest(req);

	const { props } = await getPaginatedStaticProps(
		params as { language: string; i: string },
		(variables) =>
			getSearchResultsPersons({
				...variables,
				term: query?.q as string,
			}),
		(d) => d.persons.nodes,
		(d) => d.persons.aggregate?.count
	);
	return {
		props,
	};
}
