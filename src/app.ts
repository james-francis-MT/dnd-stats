import express, { type Express } from "express";
import { routes } from "./routes";
import { useCases } from "./useCases";

const app: Express = express();
const port = 3000;

app.use(routes(useCases()));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
