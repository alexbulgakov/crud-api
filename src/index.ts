import { createServer } from "node:http";

import { routes } from "./routes";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

export const app = createServer(routes);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
