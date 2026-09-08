import { UUID } from "crypto";
import { Character } from "../domain/character";
import { CharacterStore } from "../gateways/characterStore/characterStore";

type Result<T> = {
  success: boolean;
  value: T;
};

export class CreateCharacter {
  constructor(private readonly store: CharacterStore) {}

  execute(input: { name: string }): Result<{ id: UUID }> {
    const id = this.store.save(new Character(input.name));
    return { success: true, value: { id: id } };
  }
}
