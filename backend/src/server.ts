import 'dotenv/config'

import { getStrCfg } from './config';
import { appUser } from './app';

const main = async () => {
    const app = await appUser();
    const port = getStrCfg('PORT');
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}


main();