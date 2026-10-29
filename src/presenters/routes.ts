import { Router, Request, Response } from "express";
import { UseCases } from "../useCases";
import path from "path";
import { UUID } from "crypto";

export const routes = (useCases: UseCases) => {
  const router = Router();

  router.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });

  router.post("/createCharacter", (req: Request, res: Response) => {
    const { createCharacter } = useCases;

    const charId = createCharacter.execute({
      name: req.body.name,
      species: "",
      class: "",
      level: 0,
      abilityScores: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      },
    }).value.id;

    res.redirect(`/character/${charId}`);
  });

  router.get("/character/:id", (req: Request, res: Response) => {
    const { getCharacterSheet } = useCases;

    const id = req.params.id as UUID;

    const sheet = getCharacterSheet.execute({ id: id as UUID });

    res.status(200).send(sheet);
  });

  return router;
};
