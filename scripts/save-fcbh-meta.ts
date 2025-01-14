import dotenv from 'dotenv';

import main from './save-fcbh-meta.main';

dotenv.config({ path: ['.env', '.env.local'] });

main().catch(console.error);
