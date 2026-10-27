import { InMemoryCharacterStore } from "./gateways/characterStore/inMemoryStore";
import { CreateCharacter } from "./useCases/createCharacter";

export interface UseCases {
  createCharacter: CreateCharacter;
}

export const useCases = (): UseCases => {
  const characterStore = new InMemoryCharacterStore();
  const createCharacter = new CreateCharacter(characterStore);
  return {
    createCharacter,
  };
};
