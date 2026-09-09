import { Character } from "../src/domain/character";
import { InMemoryCharacterStore } from "../src/gateways/characterStore/inMemoryStore";
import { CreateCharacter } from "../src/useCases/createCharacter";

describe("when a user creates their character", () => {
  const store = new InMemoryCharacterStore();
  const createCharacter = new CreateCharacter(store);
  it("then they can retrieve it", () => {
    const result = createCharacter.execute({ name: "test" });

    const character = store.get(result.value.id);

    expect(character.toEqual(new Character("test"))).toBe(true);
  });
});
