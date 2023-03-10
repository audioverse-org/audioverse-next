import Sponsors, { SponsorsProps } from './list';
import React from 'react';

type Props = Omit<SponsorsProps, 'sponsors'>;

export default function AllSponsors(props: Props) {
	return <Sponsors {...props} title="All" sponsors={[]} />;
}
