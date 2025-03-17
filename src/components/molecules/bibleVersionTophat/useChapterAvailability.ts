import { useMemo } from 'react';

import isServerSide from '~src/lib/isServerSide';
import { FCBH_VERSIONS } from '~src/services/bibles/constants';

import { useBibleVersionIndicesQuery } from './__generated__/useChapterAvailability';

type Availability = Record<string, boolean>;

export default function useChapterAvailability(
	bookName?: string,
	chapterNumber?: number,
): Availability | null {
	const indices = useBibleVersionIndicesQuery(
		{},
		{
			enabled: !isServerSide(),
		},
	);

	const availabilities = useMemo(() => {
		if (!bookName || !chapterNumber || !indices.data?.collections.nodes)
			return null;

		const graphqlAvailabilities =
			indices.data.collections.nodes?.reduce<Availability>((acc, v) => {
				acc[v.id] =
					v.sequences.nodes?.some(
						(s) =>
							s.title === bookName &&
							s.recordings.nodes?.some((r) =>
								r.title.endsWith(chapterNumber.toString()),
							),
					) ?? false;
				return acc;
			}, {});

		const fcbhAvailabilities = FCBH_VERSIONS.reduce<Availability>((acc, v) => {
			acc[v.id] = true;
			return acc;
		}, {});

		return {
			...graphqlAvailabilities,
			...fcbhAvailabilities,
		};
	}, [bookName, chapterNumber, indices.data?.collections.nodes]);

	return availabilities;
}
