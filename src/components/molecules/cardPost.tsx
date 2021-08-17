import React from 'react';
import { FormattedMessage } from 'react-intl';

import Card from '@components/molecules/card';
import { formatLongDate } from '@lib/date';
import { CardPostFragment } from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';

import styles from './cardPost.module.scss';

interface CardPostProps {
	post: CardPostFragment;
}

export default function CardPost({ post }: CardPostProps): JSX.Element {
	const dur = post.readingDuration;
	return (
		<Card
			hero={post.image?.url}
			title={post.title}
			url={post.canonicalPath}
			preTitle={formatLongDate(post.publishDate)}
		>
			{post.teaser ? <p className={styles.teaser}>{post.teaser}</p> : null}
			{dur && dur > 30 && (
				<p className={styles.duration}>
					<FormattedMessage
						id="cardPost__readingDuration"
						defaultMessage="{duration} read"
						description="Card post reading duration"
						values={{
							duration: useFormattedDuration(dur),
						}}
					/>
				</p>
			)}
		</Card>
	);
}
