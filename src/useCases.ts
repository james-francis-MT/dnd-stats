import { InMemoryCharacterStore } from "./gateways/characterStore/inMemoryStore";
import { CreateCharacter } from "./useCases/createCharacter";
import { GetCharacterSheet } from "./useCases/getCharacterSheet";

export interface UseCases {
  createCharacter: CreateCharacter;
  getCharacterSheet: GetCharacterSheet;
}

const characterStore = new InMemoryCharacterStore();

export const useCases = (): UseCases => {
  const createCharacter = new CreateCharacter(characterStore);
  const getCharacterSheet = new GetCharacterSheet(characterStore);
  return {
    createCharacter,
    getCharacterSheet,
  };
};
