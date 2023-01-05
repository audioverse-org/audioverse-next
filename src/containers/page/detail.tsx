import React from 'react';
import { GetCustomDetailPageDataQuery } from '@/lib/generated/graphql';
import withFailStates from '@/components/HOCs/withFailStates';
import ContentWidthLimiter from '@/components/molecules/contentWidthLimiter';
import Heading1 from '@/components/atoms/heading1';

export type CustomPageDetailProps = GetCustomDetailPageDataQuery;

function CustomPageDetail({ page }: Must<CustomPageDetailProps>): JSX.Element {
	return (
		<ContentWidthLimiter>
			<Heading1>{page.title}</Heading1>
			<div
				dangerouslySetInnerHTML={{
					__html: page.body,
				}}
			/>
		</ContentWidthLimiter>
	);
}

export default withFailStates(CustomPageDetail, {
	useShould404: (props: CustomPageDetailProps) => !props.page,
});
