import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';

import { ApiBible } from '../getApiBible';
import { IBibleVersion } from '../types';

export function transformVersion(val: IBibleVersion): ApiBible {
	return {
		__typename: 'Collection',
		id: val.id,
		title: val.title,
		description: val.description || '',
		sponsor: {
			__typename: 'Sponsor',
			title: val.sponsor.title,
			website: val.sponsor.website,
		},
		sequences: {
			nodes: val.books.map((book) => ({
				__typename: 'Sequence',
				id: book.book_id,
				title: book.name,
				contentType: SequenceContentType.BibleBook,
				recordings: {
					nodes: book.chapters_full.map((chapter) => ({
						__typename: 'Recording',
						id: chapter.id,
						title: chapter.title,
						contentType: RecordingContentType.BibleChapter,
						duration: chapter.duration,
					})),
				},
			})),
		},
	};
}
