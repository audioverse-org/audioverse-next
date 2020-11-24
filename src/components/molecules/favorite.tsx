import { useMachine } from '@xstate/react';
import React from 'react';

import createFavoriteMachine from '@components/molecules/favorite.machine';

const machine = createFavoriteMachine();

export default function Favorite(): JSX.Element {
	const [state, send] = useMachine(machine);

	const label = state.value === 'favorited' ? 'Unfavorite' : 'Favorite';

	return <button onClick={() => send('TOGGLE')}>{label}</button>;
}
