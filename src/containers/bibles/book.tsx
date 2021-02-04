import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import withFailStates from '@components/HOCs/withFailStates';
import { GetBibleBookDetailPageDataQuery } from '@lib/generated/graphql';

export interface BookProps {
	data: NonNullable<GetBibleBookDetailPageDataQuery>;
}

function Book({ data }: BookProps): JSX.Element {
	const chapters = data.audiobible?.book.chapters || [];
	const [chapterId, setChapterId] = useState<string>(chapters[0].id);
	const chapter = chapters.find((c) => c.id === chapterId);

	return (
		<>
			<h1>{data.audiobible?.book.title}</h1>
			<h2>{data.audiobible?.title}</h2>
			<label>
				<FormattedMessage
					id="bibleBook__chapterSelectLabel"
					defaultMessage="Chapter"
					description="Bible book detail page chapter select label"
				/>{' '}
				<select
					onChange={(e) => {
						setChapterId(e.target.value);
					}}
				>
					{data.audiobible?.book.chapters.map((c) => (
						<option key={c.id} value={c.id}>
							{c.title}
						</option>
					))}
				</select>
			</label>
			<a href={chapter?.url}>
				<FormattedMessage
					id="bibleBook__mp3Label"
					defaultMessage="mp3:"
					description="Bible book detail page mp3 download link label"
				/>{' '}
				{chapter?.title}
			</a>
		</>
	);
}

const should404 = ({ data }: BookProps) => {
	return !data?.audiobible?.book.title;
};

export default withFailStates(Book, should404);
