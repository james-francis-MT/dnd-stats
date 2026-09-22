import { Router, Request, Response } from "express";
import { UseCases } from "./useCases";
import path from "path";

export const routes = (useCases: UseCases) => {
  const router = Router();

  router.get("/character", (req: Request, res: Response) => {
    const { createCharacter, getCharacterInfo, getCharacterScores } = useCases;

    const charId = createCharacter.execute({ name: "Bob" }).value.id;
    const characterInfo = getCharacterInfo.execute({ id: charId });
    const characterScores = getCharacterScores.execute({ id: charId });

    res
      .status(200)
      .send({ ...characterInfo.value, scores: characterScores.value });
  });

  router.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
  });

  return router;
};
