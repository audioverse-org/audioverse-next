// SOURCE: https://ashleemboyer.com/blog/how-i-added-a-pa11y-ci-github-action-to-my-next-js-site

module.exports = async ({ context, core, github }) => {
	// Find this PR & do nothing if this isn't a PR
	const { data } = await github.rest.repos.listPullRequestsAssociatedWithCommit(
		{
			owner: context.repo.owner,
			repo: context.repo.repo,
			commit_sha: context.sha,
		}
	);
	const prNumber = data[0] && data[0].number;
	if (!prNumber) {
		return;
	}

	// Read the lighthouse output and build the comment body
	const parsed = JSON.parse(process.env.LIGHTHOUSE_LINKS);
	const keys = Object.keys(parsed);
	const lines = keys.map((k) => `- [${k}](${parsed[k]})`);
	const commentBody = `# Lighthouse Results\n\n${lines.join('\n')}`;

	// Get the comments on this PR
	const { data: comments } = await github.rest.issues.listComments({
		owner: context.repo.owner,
		repo: context.repo.repo,
		issue_number: prNumber,
	});

	// Try to find an existing pa11y results comment
	const previousComment = comments.find((comment) =>
		comment.body.startsWith('# Lighthouse Results')
	);
	if (previousComment) {
		// Update the previous comment
		await github.rest.issues.updateComment({
			owner: context.repo.owner,
			repo: context.repo.repo,
			comment_id: previousComment.id,
			body: commentBody,
		});
	} else {
		// Create a new comment
		await github.rest.issues.createComment({
			owner: context.repo.owner,
			repo: context.repo.repo,
			issue_number: prNumber,
			body: commentBody,
		});
	}
};
