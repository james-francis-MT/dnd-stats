import { Router, Request, Response } from "express";
import { UseCases } from "./useCases";
import path from "path";
import { UUID } from "crypto";

export const routes = (useCases: UseCases) => {
  const router = Router();

  router.get("/character/:id", (req: Request, res: Response) => {
    const { getCharacterInfo, getCharacterScores } = useCases;

    const id = req.params.id as UUID;

    const characterInfo = getCharacterInfo.execute({ id: id as UUID });
    const characterScores = getCharacterScores.execute({ id: id as UUID });
    res
      .status(200)
      .send({ ...characterInfo.value, scores: characterScores.value });
  });

  router.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
  });

  router.post("/createCharacter", (req: Request, res: Response) => {
    const { createCharacter } = useCases;

    const charId = createCharacter.execute({ name: req.body.name }).value.id;

    res.redirect(`/character/${charId}`);
  });

  return router;
};
