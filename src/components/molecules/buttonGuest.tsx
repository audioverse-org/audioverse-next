import React, { useState } from 'react';

import Button from '@components/molecules/button';
import Modal from '@components/organisms/modal';

export default function ButtonGuest(): JSX.Element {
	const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

	return (
		<>
			<a className="decorated" onClick={() => setIsGuestModalOpen(true)}>
				Continue as guest
			</a>
			<Modal
				open={isGuestModalOpen}
				onClose={() => setIsGuestModalOpen(false)}
				title="Continue as guest?"
				actions={
					<>
						<a className="decorated">Continue as guest</a>
						<Button type="primary" text="Log in" />
						<Button type="super" text="Create account" />
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
