import app from "./app.js";
import { PORT } from "./config.js";

app.listen(PORT, () => {
  console.log(`BetShow backend running on http://localhost:${PORT}`);
});
