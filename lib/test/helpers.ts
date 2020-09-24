import * as api from '@lib/api';

export function loadTestimonies(nodes: Testimony[] | null = null) {
	jest.spyOn(api, 'getTestimonies').mockResolvedValue({
		nodes: nodes || [
			{
				author: 'the_testimony_author',
				body: 'the_testimony_body',
				writtenDate: 'the_testimony_date',
			},
		],
		aggregate: {
			count: 1,
		},
	});
}
