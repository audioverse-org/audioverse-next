import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';

/**
 * Factory function that returns a getStaticProps function.
 * This allows for consistent error handling, logging, and other shared functionality
 * across all getStaticProps implementations.
 *
 * @param fn The getStaticProps implementation function
 * @returns The wrapped getStaticProps function
 */
export function makeGetStaticProps<P, T extends ParsedUrlQuery>(
	fn: (context: GetStaticPropsContext<T>) => Promise<GetStaticPropsResult<P>>,
): (context: GetStaticPropsContext<T>) => Promise<GetStaticPropsResult<P>> {
	return fn;
}
