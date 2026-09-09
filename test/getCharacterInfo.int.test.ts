import { InMemoryCharacterStore } from "../src/gateways/characterStore/inMemoryStore";
import { CreateCharacter } from "../src/useCases/createCharacter";
import { GetCharacterInfo } from "../src/useCases/getCharacterInfo";

describe("when I call retrieve info with an id", () => {
  it("returns the characters info", () => {
    const store = new InMemoryCharacterStore();
    const createCharacter = new CreateCharacter(store);
    const getCharacterInfo = new GetCharacterInfo(store);

    const id = createCharacter.execute({ name: "Bob" }).value.id;
    const result = getCharacterInfo.execute({ id: id });

    const info = result.value;

    expect(info).toEqual({ name: "Bob" });
  });
});
