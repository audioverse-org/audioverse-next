import dotenv from 'dotenv';

import main from './save-graphql-version-indices.main';

dotenv.config({ path: ['.env', '.env.local'] });

main().catch(console.error);
