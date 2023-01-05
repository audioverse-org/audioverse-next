import React from 'react';

import { SequenceContentType } from '@/lib/generated/graphql';
import { getSequenceTypeTheme } from '@/lib/getSequenceType';

import TypeLockup from './typeLockup';

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
