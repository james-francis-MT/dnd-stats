import { randomUUID } from "crypto";
import { Character } from "../domain/character";
import { GetCharacterScores } from "./getCharacterScores";

const mockStore = {
  save: jest.fn(),
  get: jest.fn(),
};

describe("get character ability scores", () => {
  const getScores = new GetCharacterScores(mockStore);
  mockStore.get.mockReturnValue(
    new Character("test", {
      strength: 1,
      dexterity: 2,
      constitution: 3,
      intelligence: 4,
      wisdom: 5,
      charisma: 6,
    }),
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
