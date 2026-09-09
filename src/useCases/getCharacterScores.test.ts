import { randomUUID } from "crypto";
import { Character } from "../domain/character";
import { GetCharacterScores } from "./getCharacterScores";

const mockStore = {
  save: jest.fn(),
  get: jest.fn(),
};

describe("get character ability scores", () => {
  const getScores = new GetCharacterScores(mockStore);
  mockStore.get.mockReturnValue(new Character("test", { strength: 15 }));
  it("returns strength", () => {
    const mockId = randomUUID();

    const result = getScores.execute({ id: mockId });

    const scores = result.value;
    expect(scores.strength).toEqual(15);
  });
});
