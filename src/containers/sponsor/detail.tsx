import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import { SponsorStaticProps } from '@pages/[language]/sponsors/[id]';

type Props = SponsorStaticProps['props'];

function Sponsor({ data }: Props): JSX.Element {
	const img = data?.sponsor?.imageWithFallback?.url;
	return (
		<>
			{img && <img alt={data?.sponsor?.title} src={img} />}
			<h1>{data?.sponsor?.title}</h1>
			{/* TODO: Do not render these elements if nothing to display */}
			<p>{data?.sponsor?.summary}</p>
			<p>{data?.sponsor?.location}</p>
			<p>{data?.sponsor?.website}</p>
			<p
				dangerouslySetInnerHTML={{ __html: data?.sponsor?.description || '' }}
			/>
		</>
	);
}

export default withFailStates(Sponsor, ({ nodes }) => !nodes?.length);
