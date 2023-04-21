import React from 'react';

import { getSequenceTypeTheme } from '~lib/getSequenceType';
import { SequenceContentType } from '~src/__generated__/graphql';

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
