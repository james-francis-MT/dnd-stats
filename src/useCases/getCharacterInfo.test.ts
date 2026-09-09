import { randomUUID } from "crypto";
import { Character } from "../domain/character";
import { GetCharacterInfo } from "./getCharacterInfo";

const mockStore = {
  save: jest.fn(),
  get: jest.fn(),
};

describe("get character info", () => {
  const getCharacterInfo = new GetCharacterInfo(mockStore);

  it("returns test name", () => {
    mockStore.get.mockReturnValue(new Character("test"));

    const testId = randomUUID();
    const result = getCharacterInfo.execute({ id: testId });
    const info = result.value;

    expect(info.name).toEqual("test");
  });
});
