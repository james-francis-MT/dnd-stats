import { Router, Request, Response } from "express";
import { GetCharacterInfo } from "./useCases/getCharacterInfo";
import { InMemoryCharacterStore } from "./gateways/characterStore/inMemoryStore";
import { CreateCharacter } from "./useCases/createCharacter";

export const routes = () => {
  const router = Router();

  const characterStore = new InMemoryCharacterStore();
  const createCharacter = new CreateCharacter(characterStore);
  const getCharacterInfo = new GetCharacterInfo(characterStore);

  router.get("/character", (req: Request, res: Response) => {
    const charId = createCharacter.execute({ name: "Bob" }).value.id;
    const characterInfo = getCharacterInfo.execute({ id: charId });
    res.status(200).send(characterInfo.value);
  });

  return router;
};
