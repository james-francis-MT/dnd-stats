import { UUID } from "crypto";
import { CharacterStore } from "../gateways/characterStore/characterStore";
import { Result } from "../utils/result";

export class GetCharacterInfo {
  constructor(private readonly store: CharacterStore) {}

  execute(input: { id: UUID }): Result<{ name: string }> {
    const character = this.store.get(input.id);

    return { success: true, value: character.info() };
  }
}
