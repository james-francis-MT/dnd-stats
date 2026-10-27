import { UUID } from "crypto";
import { Character } from "../domain/character";
import { CharacterStore } from "../gateways/characterStore/characterStore";
import { Result } from "../utils/result";
import { AbilityScores } from "../domain/abilityScores";

type CreateCharacterInput = {
  name: string;
  species: string;
  class: string;
  level: number;
  abilityScores: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
};

export class CreateCharacter {
  constructor(private readonly store: CharacterStore) {}

  execute(input: CreateCharacterInput): Result<{ id: UUID }> {
    const {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    } = input.abilityScores;

    const abilityScores = new AbilityScores(
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    );

    const id = this.store.save(
      new Character(
        input.name,
        input.species,
        input.class,
        input.level,
        abilityScores,
      ),
    );

    return { success: true, value: { id: id } };
  }
}
