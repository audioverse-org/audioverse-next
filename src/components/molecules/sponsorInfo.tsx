import React from 'react';

import { SponsorInfoFragment } from '@lib/generated/graphql';

export default function SponsorInfo({
	sponsor,
}: {
	sponsor: SponsorInfoFragment;
}): JSX.Element {
	// TODO: link sponsor title to internal sponsor detail page
	return (
		<p>
			<a href="#">{sponsor.title}</a>
			<br />
			<span>{sponsor.location}</span>
			<br />
			<span>{sponsor.website}</span>
		</p>
	);
}
