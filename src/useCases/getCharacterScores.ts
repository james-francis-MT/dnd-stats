import { UUID } from "crypto";
import { CharacterStore } from "../gateways/characterStore/characterStore";
import { Result } from "../utils/result";
import { AbilityScores } from "../domain/abilityScores";

export class GetCharacterScores {
  constructor(private readonly store: CharacterStore) {}

  execute(input: { id: UUID }): Result<AbilityScores> {
    const character = this.store.get(input.id);
    return { success: true, value: character.scores() };
  }
}
