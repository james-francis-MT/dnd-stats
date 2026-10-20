import { randomUUID } from "crypto";
import { Character } from "../domain/character";
import { GetCharacterScores } from "./getCharacterScores";
import { AbilityScores } from "../domain/abilityScores";

const mockStore = {
  save: jest.fn(),
  get: jest.fn(),
};

describe("get character ability scores", () => {
  const getScores = new GetCharacterScores(mockStore);
  mockStore.get.mockReturnValue(
    new Character("test", new AbilityScores(1, 2, 3, 4, 5, 6)),
  );
  it("returns strength", () => {
    const mockId = randomUUID();

    const result = getScores.execute({ id: mockId });

    const scores = result.value;
    expect(scores).toEqual({
      strength: 1,
      dexterity: 2,
      constitution: 3,
      intelligence: 4,
      wisdom: 5,
      charisma: 6,
    });
  });
});
