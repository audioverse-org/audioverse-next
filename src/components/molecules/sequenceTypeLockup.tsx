import React from 'react';

import { getSequenceTypeTheme } from '@lib/getSequenceType';

import TypeLockup from './typeLockup';
import { SequenceContentType } from '@src/__generated__/graphql';

type Props = {
	contentType: SequenceContentType;
	unpadded?: boolean;
};

export default function SequenceTypeLockup({
	contentType,
	unpadded,
}: Props): JSX.Element {
	return <TypeLockup {...{ unpadded, ...getSequenceTypeTheme(contentType) }} />;
}
