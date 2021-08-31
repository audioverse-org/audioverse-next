import Image from 'next/image';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import HorizontalRule from '@components/atoms/horizontalRule';
import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import CardColumn from '@components/molecules/card/column';
import CardPost from '@components/molecules/card/post';
import { formatLongDate } from '@lib/date';
import { GetBlogDetailDataQuery } from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';

import styles from './detail.module.scss';

export type BlogPost = NonNullable<GetBlogDetailDataQuery['blogPost']>;

export interface BlogPostDetailProps {
	blogPost: BlogPost | null;
	blogPosts: NonNullable<GetBlogDetailDataQuery['blogPosts']>;
	title: string | null;
}

function BlogPostDetail({ blogPost, blogPosts }: Must<BlogPostDetailProps>) {
	const {
		body,
		image,
		publishDate,
		readingDuration,
		teaser,
		title,
		canonicalPath,
	} = blogPost;
	return (
		<div className={styles.container}>
			{image ? (
				<div className={styles.imageContainer}>
					<Image src={image.url} alt={title} layout="fill" objectFit="cover" />
				</div>
			) : null}
			<div className={styles.row}>
				<div className={styles.main}>
					<div className={styles.date}>{formatLongDate(publishDate)}</div>
					<h1>{title}</h1>
					<div className={styles.teaser}>{teaser}</div>
					{readingDuration && readingDuration > 30 && (
						<div className={styles.duration}>
							<FormattedMessage
								id="blogDetailPage__readingDuration"
								defaultMessage="{duration} read"
								description="Blog post detail reading duration"
								values={{
									duration: useFormattedDuration(readingDuration),
								}}
							/>
						</div>
					)}
					<HorizontalRule color="lightTone" />
					<div
						className={styles.article}
						dangerouslySetInnerHTML={{ __html: body }}
					/>
				</div>
				<div className={styles.sidebar}>
					<LineHeading>
						<FormattedMessage
							id="blogDetailPage__moreBlogPosts"
							defaultMessage="More Blog Posts"
							description="Blog post detail more blog posts"
						/>
					</LineHeading>
					<CardColumn
						items={(blogPosts.nodes || [])
							.filter((p) => p.canonicalPath !== canonicalPath)
							.map((post) => (
								<CardPost post={post} key={post.canonicalPath} />
							))}
						className={styles.cards}
					/>
				</div>
			</div>
		</div>
	);
}

export default withFailStates(BlogPostDetail, (props) => !props.blogPost);
