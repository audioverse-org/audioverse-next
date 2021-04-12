import React, { useEffect, useState } from 'react';
import { useRegisterMutation } from '@lib/generated/graphql';

function Register(): JSX.Element {
	const [errors, setErrors] = useState<string[]>([]);
	const [pass, setPass] = useState<string>('');
	const [pass2, setPass2] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const { mutate, isLoading, data, isSuccess } = useRegisterMutation();

	useEffect(() => {
		if (data?.signup.errors.length) {
			setErrors(data?.signup.errors.map((e) => e.message));
		}
	}, [data]);

	if (isLoading) {
		return <p>loading...</p>;
	}

	if (isSuccess && !errors.length) {
		return <p>success</p>;
	}

	return (
		<>
			{/* TODO: figure out a better key to use */}
			<ul>
				{errors.map((e, i) => (
					<li key={i}>{e}</li>
				))}
			</ul>
			<input
				type="email"
				placeholder={'email'}
				required={true}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder={'password'}
				required={true}
				onChange={(e) => {
					setPass(e.target.value);
				}}
			/>
			<input
				type="password"
				placeholder={'confirm password'}
				required={true}
				onChange={(e) => setPass2(e.target.value)}
			/>
			<button
				onClick={() => {
					setErrors([]);
					let newErrors = [];
					if (!email.length) {
						newErrors.push('email is required');
					}
					if (!pass || !pass2) {
						newErrors.push('please type password twice');
					}
					if (pass !== pass2) {
						newErrors.push('passwords do not match');
					}
					if (newErrors.length) {
						setErrors(newErrors);
					}
					mutate({
						email,
						password: pass,
					});
				}}
			>
				sign up
			</button>
		</>
	);
}

export default Register;
