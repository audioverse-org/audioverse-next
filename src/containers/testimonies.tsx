import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Button from '@components/molecules/button';
import ContentWidthLimiter from '@components/molecules/contentWidthLimiter';
import Pagination from '@components/molecules/pagination';
import AboutNav from '@components/organisms/aboutNav';
import { GetTestimoniesPageDataQuery } from '@lib/generated/graphql';
import { PaginatedProps } from '@lib/getPaginatedStaticProps';
import root, { makeTestimonySubmitRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './testimonies.module.scss';

export type TestimoniesProps = PaginatedProps<
	NonNullable<GetTestimoniesPageDataQuery['testimonies']['nodes']>[0],
	GetTestimoniesPageDataQuery
>;

export default function Testimonies({
	nodes,
	pagination,
}: TestimoniesProps): JSX.Element {
	const languageRoute = useLanguageRoute();

	// Semantic quotations:
	// https://css-tricks.com/quoting-in-html-quotations-citations-and-blockquotes/#hey-what-about-the-figure-element
	return (
		<div className={styles.wrapper}>
			<AboutNav current="testimonials" />
			<Heading1 className={styles.heading}>
				<FormattedMessage
					id="testimonies__heading"
					defaultMessage="Testimonials"
				/>
			</Heading1>
			<p className={styles.intro}>
				<FormattedMessage
					id="testimonies__intro"
					defaultMessage="Have a great testimony? Tell us your story!"
				/>
			</p>
			<Button
				type="super"
				text={
					<FormattedMessage
						id="testimonies__shareYourStory"
						defaultMessage="Share your story"
					/>
				}
				href={makeTestimonySubmitRoute(languageRoute)}
			/>
			<ContentWidthLimiter>
				<hr className={styles.rule} />
				<ul className={styles.list}>
					{nodes.map((n, i) => (
						<li className={styles.entry} key={i}>
							<figure className={styles.figure}>
								<blockquote
									className={styles.quotation}
									dangerouslySetInnerHTML={{ __html: n.body }}
								/>
								<figcaption className={styles.source}>
									{n.author},{' '}
									{new Date(n.writtenDate).toLocaleString('default', {
										month: 'numeric',
										day: 'numeric',
										year: '2-digit',
									})}
								</figcaption>
							</figure>
						</li>
					))}
				</ul>

				<Pagination
					current={pagination.current}
					total={pagination.total}
					makeRoute={(l, i) => root.lang(l).testimonies.page(i).get()}
				/>
			</ContentWidthLimiter>
		</div>
	);
}
