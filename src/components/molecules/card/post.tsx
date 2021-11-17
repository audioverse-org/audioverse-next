import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading2 from '@components/atoms/heading2';
import Heading6 from '@components/atoms/heading6';
import Card from '@components/molecules/card';
import { BaseColors } from '@lib/constants';
import { formatLongDate } from '@lib/date';
import { CardPostFragment } from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';

import IconAlignLeft from '../../../../public/img/fa-align-left.svg';
import TypeLockup from '../typeLockup';

import styles from './post.module.scss';

interface CardPostProps {
	post: CardPostFragment;
	alternate?: boolean;
}

export default function CardPost({
	post,
	alternate,
}: CardPostProps): JSX.Element {
	const dur = post.readingDuration || 0;
	const duration = useFormattedDuration(dur);
	const heroImage = post.image?.url && (
		<div className={clsx(alternate && styles.alternate)}>
			<Image src={post.image.url} alt={post.title} width={500} height={260} />
		</div>
	);
	return (
		<Card>
			<Link href={post.canonicalPath}>
				<a className={styles.container}>
					{alternate && (
						<div className={styles.type}>
							<TypeLockup
								label={
									<FormattedMessage
										id="cardPost__typeLabel"
										defaultMessage="Blog"
									/>
								}
								Icon={IconAlignLeft}
								textColor={BaseColors.DARK}
								iconColor={BaseColors.RED}
							/>
						</div>
					)}
					{heroImage}
					<div className={styles.content}>
						<Heading6 sans unpadded className={styles.date}>
							{formatLongDate(post.publishDate)}
						</Heading6>
						<Heading2>{post.title}</Heading2>
						{post.teaser ? (
							<p className={styles.teaser}>{post.teaser}</p>
						) : null}
						<div className={styles.flexGrow}>
							<p className={styles.duration}>
								<FormattedMessage
									id="cardPost__readingDuration"
									defaultMessage="{duration} read"
									description="Card post reading duration"
									values={{
										duration,
									}}
								/>
							</p>
						</div>
					</div>
				</a>
			</Link>
		</Card>
	);
}
