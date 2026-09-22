import { InMemoryCharacterStore } from "./gateways/characterStore/inMemoryStore";
import { CreateCharacter } from "./useCases/createCharacter";
import { GetCharacterInfo } from "./useCases/getCharacterInfo";
import { GetCharacterScores } from "./useCases/getCharacterScores";

export interface UseCases {
  createCharacter: CreateCharacter;
  getCharacterInfo: GetCharacterInfo;
  getCharacterScores: GetCharacterScores;
}

export const useCases = (): UseCases => {
  const characterStore = new InMemoryCharacterStore();
  const createCharacter = new CreateCharacter(characterStore);
  const getCharacterInfo = new GetCharacterInfo(characterStore);
  const getCharacterScores = new GetCharacterScores(characterStore);
  return {
    createCharacter,
    getCharacterInfo,
    getCharacterScores,
  };
};
