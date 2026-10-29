import { UUID } from "crypto";
import { CharacterStore } from "../gateways/characterStore/characterStore";
import { Result } from "../utils/result";

export class GetCharacterSheet {
  constructor(private readonly store: CharacterStore) {}

  execute(input: { id: UUID }): Result<{ sheet: Object }> {
    const character = this.store.get(input.id);

    return { success: true, value: { sheet: character.sheet() } };
  }
}
