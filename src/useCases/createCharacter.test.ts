import { Character } from "../domain/character";
import { CreateCharacter } from "./createCharacter";

const storeMock = {
  save: jest.fn(),
  get: jest.fn(),
};

describe("store character", () => {
  const createCharacter = new CreateCharacter(storeMock);
  it("calls save on store", () => {
    createCharacter.execute({ name: "test" });

    expect(storeMock.save).toHaveBeenCalled();
    expect(storeMock.save).toHaveBeenCalledWith(new Character("test"));
  });

  it("returns the id", () => {
    const id = "05b86b6c-c349-496a-b94f-a6c3d801ebf5";
    storeMock.save.mockReturnValueOnce(id);
    const result = createCharacter.execute({ name: "test" });

    expect(result.value.id).toEqual(id);
  });
});
