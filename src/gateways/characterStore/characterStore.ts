import { UUID } from "crypto";
import { Character } from "../../domain/character";

export interface CharacterStore {
  save: (character: Character) => UUID;
  get: (id: UUID) => Character;
}
