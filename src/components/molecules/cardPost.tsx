import React from 'react';

import Card from '@components/molecules/card';
import formatDuration from '@lib/formatDuration';
import { CardPostFragment } from '@lib/generated/graphql';

interface CardPostProps {
	post: CardPostFragment;
}

export default function CardPost({ post }: CardPostProps): JSX.Element {
	const d = new Date(post.publishDate);
	return (
		<Card
			hero={post.image?.url}
			title={post.title}
			url={post.canonicalUrl}
			preTitle={d.toLocaleString('default', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			})}
		>
			<p>{post.teaser}</p>
			{post.readingDuration && <p>{formatDuration(post.readingDuration)}</p>}
		</Card>
	);
}
