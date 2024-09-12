import "dotenv/config";

import { config } from "./config";
import { appUser } from "./app";

const main = async () => {
  const app = await appUser();
  const port = config.user.portServer;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

main();
