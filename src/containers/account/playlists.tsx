import React, { FormEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQueryClient } from 'react-query';

import withAuthGuard from '@components/HOCs/withAuthGuard';
import Checkbox from '@components/molecules/form/checkbox';
import Input from '@components/molecules/form/input';
import {
	useAddAccountPlaylistMutation,
	useGetAccountPlaylistsPageDataQuery,
} from '@containers/account/playlists.gql';
import { useLanguageId } from '@lib/useLanguageId';

// TODO: use this code when building out playlist management
function Playlists(): JSX.Element {
	const language = useLanguageId();
	const intl = useIntl();
	const queryClient = useQueryClient();
	const { data } = useGetAccountPlaylistsPageDataQuery({ language });
	const playlists = data?.me?.user.playlists.nodes || [];
	const [title, setTitle] = useState('');
	const [summary, setSummary] = useState('');
	const [isPublic, setIsPublic] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const { mutate } = useAddAccountPlaylistMutation({
		onSuccess: async () => {
			// TODO: Only invalidate `useGetAccountPlaylistsPageDataQuery`
			await queryClient.invalidateQueries();
		},
	});

	async function addPlaylist(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!title) {
			setErrors([
				intl.formatMessage({
					id: 'accountPlaylists__errorMissingTitle',
					defaultMessage: 'missing title',
					description: 'account playlists page missing title error message',
				}),
			]);
			return;
		}

		await mutate({
			isPublic,
			language,
			recordingIds: [],
			summary,
			title,
		});
	}

	return (
		<>
			<ul>
				{playlists.map((p) => (
					<li key={p.id}>
						<h4>{p.title}</h4>
						<span>{p.recordings.aggregate?.count}</span>
						<span>
							{p.isPublic
								? intl.formatMessage({
										id: 'accountPlaylists__labelPublic',
										defaultMessage: 'public',
										description: 'account playlists page playlist public label',
								  })
								: intl.formatMessage({
										id: 'accountPlaylists__labelPrivate',
										defaultMessage: 'private',
										description:
											'account playlists page playlist private label',
								  })}
						</span>
						<span>{p.summary}</span>
					</li>
				))}
			</ul>
			<form onSubmit={addPlaylist}>
				<ul>
					{errors.map((e) => (
						<li key={e}>{e}</li>
					))}
				</ul>
				<Input
					type="text"
					label={intl.formatMessage({
						id: 'accountPlaylists__inputLabelTitle',
						defaultMessage: 'title',
						description: 'account playlists page input label title',
					})}
					value={title}
					setValue={setTitle}
				/>
				<Input
					type="text"
					label={intl.formatMessage({
						id: 'accountPlaylists__inputLabelSummary',
						defaultMessage: 'summary',
						description: 'account playlists page input label summary',
					})}
					value={summary}
					setValue={setSummary}
				/>
				<Checkbox
					label={intl.formatMessage({
						id: 'accountPlaylists__inputLabelPublic',
						defaultMessage: 'public',
						description: 'account playlists page input label public',
					})}
					checked={isPublic}
					toggleChecked={() => setIsPublic(!isPublic)}
				/>
				<button type="submit">
					<FormattedMessage
						id="accountPlaylists__buttonLabelSubmit"
						defaultMessage="Add Playlist"
						description="account playlists page submit button label"
					/>
				</button>
			</form>
		</>
	);
}

export default withAuthGuard(Playlists);
