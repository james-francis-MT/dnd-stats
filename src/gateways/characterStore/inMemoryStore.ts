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
    const character = this.characters[id];

    if (!character) {
      throw new Error(`no character with that id: ${id}`);
    }
    return character;
  }
}
