import { InMemoryCharacterStore } from "../src/gateways/characterStore/inMemoryStore";
import { CreateCharacter } from "../src/useCases/createCharacter";
import { GetCharacterStats } from "../src/useCases/getCharacterStats";

describe("when I call retrieve stats with an id", () => {
  it("returns the characters stats", () => {
    const store = new InMemoryCharacterStore();
    const createCharacter = new CreateCharacter(store);
    const getCharacterStats = new GetCharacterStats(store);

    const id = createCharacter.execute({ name: "Bob" }).value.id;
    const result = getCharacterStats.execute({ id: id });

    expect(result.value.name).toEqual("Bob");
  });
});
