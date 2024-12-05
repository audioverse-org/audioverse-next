import React from 'react';

import Heading1 from '~components/atoms/heading1';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import AndFailStates from '~src/components/templates/andFailStates';
import { Must } from '~src/types/types';

import { GetCustomDetailPageDataQuery } from './__generated__/detail';

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

const WithFailStates = (props: Parameters<typeof CustomPageDetail>[0]) => (
	<AndFailStates
		Component={CustomPageDetail}
		componentProps={props}
		options={{ should404: (props: CustomPageDetailProps) => !props.page }}
	/>
);
export default WithFailStates;
