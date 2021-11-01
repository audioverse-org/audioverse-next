import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

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
				<FormattedMessage
					id="molecule-buttonGuest__label"
					defaultMessage="Continue as guest"
				/>
				<Icon />
			</a>
			<Modal
				open={isGuestModalOpen}
				onClose={() => setIsGuestModalOpen(false)}
				title={
					<FormattedMessage
						id="molecule-buttonGuest__modalTitle"
						defaultMessage="Continue as guest?"
					/>
				}
				actions={
					<>
						<Link href={makeDiscoverRoute(language)}>
							<a className="decorated">
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelGuest"
									defaultMessage="Continue as guest"
								/>
							</a>
						</Link>
						<Button
							onClick={() => setIsGuestModalOpen(false)}
							href={makeLoginRoute(language)}
							type="primary"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelLogIn"
									defaultMessage="Log in"
								/>
							}
						/>
						<Button
							onClick={() => setIsGuestModalOpen(false)}
							href={makeRegisterRoute(language)}
							type="super"
							text={
								<FormattedMessage
									id="molecule-buttonGuest__modalButtonLabelCreateAccount"
									defaultMessage="Create account"
								/>
							}
						/>
					</>
				}
			>
				<p>
					<FormattedMessage
						id="molecule-buttonGuest__modalParagraph"
						defaultMessage="You'll be missing out on some key features without an account, like:"
					/>
				</p>
				{/*TODO: Update list contents*/}
				<ul>
					<li>
						<FormattedMessage
							id="molecule-buttonGuest__feature1"
							defaultMessage="Lorem ipsum dolor"
						/>
					</li>
					<li>
						<FormattedMessage
							id="molecule-buttonGuest__feature2"
							defaultMessage="Et exictur purim multatim"
						/>
					</li>
					<li>
						<FormattedMessage
							id="molecule-buttonGuest__feature3"
							defaultMessage="Dulipscum erudis fesin"
						/>
					</li>
				</ul>
			</Modal>
		</>
	);
}
