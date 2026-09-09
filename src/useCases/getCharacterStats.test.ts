import { randomUUID } from "crypto";
import { Character } from "../domain/character";
import { GetCharacterStats } from "./getCharacterStats";

const mockStore = {
  save: jest.fn(),
  get: jest.fn(),
};

describe("get character stats", () => {
  const getCharacterStats = new GetCharacterStats(mockStore);

  it("returns test name", () => {
    mockStore.get.mockReturnValue(new Character("test"));

    const testId = randomUUID();
    const result = getCharacterStats.execute({ id: testId });
    const stats = result.value;

    expect(stats.name).toEqual("test");
  });

  it("returns bob name", () => {
    mockStore.get.mockReturnValue(new Character("bob"));

    const testId = randomUUID();
    const result = getCharacterStats.execute({ id: testId });
    const stats = result.value;

    expect(stats.name).toEqual("bob");
  });
});
