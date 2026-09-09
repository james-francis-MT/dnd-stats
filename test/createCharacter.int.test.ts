import { Character } from "../src/domain/character";
import { InMemoryCharacterStore } from "../src/gateways/characterStore/inMemoryStore";
import { CreateCharacter } from "../src/useCases/createCharacter";

describe("when a user saves their character", () => {
  it("then they can retrieve it", () => {
    const store = new InMemoryCharacterStore();
    const createCharacter = new CreateCharacter(store);

    const result = createCharacter.execute({ name: "test" });

    const character = store.get(result.value.id);

    expect(character.toEqual(new Character("test"))).toBe(true);
  });
});
