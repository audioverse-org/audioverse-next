import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
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
	const heroImage = post.image?.url && (
		<Link href={post.canonicalPath}>
			<a>
				<Image
					className={styles.hero}
					src={post.image.url}
					alt={post.title}
					width={500}
					height={260}
				/>
			</a>
		</Link>
	);
	return (
		<Card>
			<div className={styles.container}>
				{heroImage}
				<div className={styles.content}>
					<Heading6 sans unpadded className={styles.date}>
						{formatLongDate(post.publishDate)}
					</Heading6>
					<Heading2>
						<Link href={post.canonicalPath}>
							<a>{post.title}</a>
						</Link>
					</Heading2>
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
				</div>
			</div>
		</Card>
	);
}
