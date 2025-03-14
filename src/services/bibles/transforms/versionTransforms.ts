import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';

import { GraphqlBible } from '../graphql/fetchGraphqlBible';
import { IBibleVersion } from '../types';

export function transformVersion(val: IBibleVersion): GraphqlBible {
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
					nodes: book.chapters.map((n) => ({
						__typename: 'Recording',
						id: `${book.book_id}/${n}`,
						title: `${book.name} ${n}`,
						contentType: RecordingContentType.BibleChapter,
						duration: 0,
					})),
				},
			})),
		},
	};
}
