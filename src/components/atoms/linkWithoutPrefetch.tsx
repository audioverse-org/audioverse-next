import Link from 'next/link';
import React, { ComponentPropsWithoutRef } from 'react';

export default function LinkWithoutPrefetch(
	props: ComponentPropsWithoutRef<typeof Link>,
): JSX.Element {
	return <Link prefetch={false} {...props} />;
}
