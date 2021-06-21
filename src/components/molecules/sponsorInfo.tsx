import React from 'react';

import { SponsorInfoFragment } from '@lib/generated/graphql';
import { makeSponsorRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

export default function SponsorInfo({
	sponsor,
}: {
	sponsor: SponsorInfoFragment;
}): JSX.Element {
	return (
		<p>
			<a href={makeSponsorRoute(useLanguageRoute(), sponsor.id)}>
				{sponsor.title}
			</a>
		</p>
	);
}
