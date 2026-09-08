import { randomUUID, UUID } from "crypto";
import { Character } from "../../domain/character";
import { CharacterStore } from "./characterStore";

export class InMemoryCharacterStore implements CharacterStore {
  characters: Record<string, Character> = {};

  save(character: Character): UUID {
    const id = randomUUID();
    this.characters[id] = character;
    return id;
  }

  get(id: string): Character {
    return this.characters[id];
  }
}
