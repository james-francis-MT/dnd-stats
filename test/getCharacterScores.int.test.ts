import { AbilityScores } from "../src/domain/abilityScores";
import { InMemoryCharacterStore } from "../src/gateways/characterStore/inMemoryStore";
import { CreateCharacter } from "../src/useCases/createCharacter";
import { GetCharacterScores } from "../src/useCases/getCharacterScores";

describe("when I call retrieve ability scores with an id", () => {
  it("returns the characters ability scores", () => {
    const store = new InMemoryCharacterStore();
    const createCharacter = new CreateCharacter(store);
    const getCharacterScores = new GetCharacterScores(store);

    const id = createCharacter.execute({ name: "Bob" }).value.id;
    const result = getCharacterScores.execute({ id: id });

    const scores = result.value;

    expect(scores).toEqual(AbilityScores.default());
  });
});
