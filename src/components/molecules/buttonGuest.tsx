import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';

import Button from '@components/molecules/button';
import Modal from '@components/organisms/modal';
import {
	makeDiscoverRoute,
	makeLoginRoute,
	makeRegisterRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import Icon from '../../../public/img/icon-info.svg';

import styles from './buttonGuest.module.scss';

export default function ButtonGuest({
	className,
}: {
	className?: string;
}): JSX.Element {
	const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
	const language = useLanguageRoute();

	// TODO: Use <button> element for semantics and accessibility
	return (
		<>
			<a
				className={clsx('decorated', className, styles.link)}
				onClick={() => setIsGuestModalOpen(true)}
			>
				Continue as guest
				<Icon />
			</a>
			<Modal
				open={isGuestModalOpen}
				onClose={() => setIsGuestModalOpen(false)}
				title="Continue as guest?"
				actions={
					<>
						<Link href={makeDiscoverRoute(language)}>
							<a className="decorated">Continue as guest</a>
						</Link>
						<Button
							href={makeLoginRoute(language)}
							type="primary"
							text="Log in"
						/>
						<Button
							href={makeRegisterRoute(language)}
							type="super"
							text="Create account"
						/>
					</>
				}
			>
				<p>
					You&apos;ll be missing out on some key features without an account,
					like:
				</p>
				{/*TODO: Update list contents*/}
				<ul>
					<li>Lorem ipsum dolor</li>
					<li>Et exictur purim multatim</li>
					<li>Dulipscum erudis fesin</li>
				</ul>
			</Modal>
		</>
	);
}
