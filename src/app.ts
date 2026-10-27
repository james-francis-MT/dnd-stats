import express, { type Express } from "express";
import { routes } from "./presenters/routes";
import { useCases } from "./useCases";

const app: Express = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(routes(useCases()));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
