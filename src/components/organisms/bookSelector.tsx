import React from 'react';

import { PassageNavigationFragment } from './__generated__/passageNavigation';

type Props = {
	books: Array<PassageNavigationFragment>;
};

export default function BookSelector({ books }: Props) {}
