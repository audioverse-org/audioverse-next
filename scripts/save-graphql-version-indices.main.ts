import fs from 'fs';

import { FCBH_VERSIONS } from '~src/services/bibles/fcbh/fetchFcbhBibles';
import getVersions from '~src/services/bibles/getVersions';
import { getGraphqlVersionIndex } from '~src/services/bibles/graphql/__generated__/graphqlVersionIndices';

export default async function main() {
	// Get all versions
	const allVersions = await getVersions();

	// Filter out FCBH versions (we already have those cached)
	const graphqlVersions = allVersions.filter(
		(v) => !v.id.toString().startsWith('FCBH_'),
	);

	console.log(
		`Fetching indices for ${graphqlVersions.length} GraphQL versions...`,
	);

	// Fetch indices for all GraphQL versions
	const indices: Record<string, unknown> = {};
	let count = 0;

	for (const version of graphqlVersions) {
		try {
			const isFcbhVersion = FCBH_VERSIONS.some((v) => v.id === version.id);

			if (isFcbhVersion) {
				continue;
			}

			const index = await getGraphqlVersionIndex({
				collectionId: version.id,
			});

			if (index?.collection?.sequences?.nodes) {
				indices[version.id] = index.collection.sequences.nodes.map(
					(sequence) => ({
						id: sequence.id,
						title: sequence.title,
						recordings:
							sequence.recordings.nodes?.map((recording) => ({
								id: recording.id,
								title: recording.title,
							})) || [],
					}),
				);

				count++;
				if (count % 10 === 0) {
					console.log(
						`Processed ${count}/${graphqlVersions.length} versions...`,
					);
				}
			}
		} catch (error) {
			console.error(`Error fetching index for version ${version.id}:`, error);
		}
	}

	console.log(`Successfully fetched indices for ${count} versions.`);

	fs.writeFileSync(
		'src/services/bibles/graphql/graphqlVersionIndices.ts',
		`// This file is auto-generated. Do not edit manually.
// Use \`npm run indices\` to update.
export const graphqlVersionIndices = ${JSON.stringify(indices, null, 2)};
`,
	);

	console.log('GraphQL version indices saved to graphqlVersionIndices.ts');
}
