import React from 'react';

function Reset(): JSX.Element {
	return (
		<>
			<input placeholder={'password'} type={'password'} />
			<input placeholder={'confirm password'} type={'password'} />
			<button>submit</button>
		</>
	);
}

export default Reset;
