import React from 'react';
import { GetBibleBookDetailPageDataQuery } from '@lib/generated/graphql';
import withFailStates from '@components/HOCs/withFailStates';

export interface BookProps {
	data: NonNullable<GetBibleBookDetailPageDataQuery>;
}

function Book({ data }: BookProps): JSX.Element {
	return (
		<>
			<h1>{data.audiobible?.book.title}</h1>
			<h2>{data.audiobible?.title}</h2>
			<label>
				Chapter{' '}
				<select>
					{data.audiobible?.book.chapters.map((c) => (
						<option key={c.id}>{c.title}</option>
					))}
				</select>
			</label>
		</>
	);
}

const should404 = ({ data }: BookProps) => {
	return !data?.audiobible?.book.title;
};

export default withFailStates(Book, should404);
