import { AbilityScores } from "../domain/abilityScores";
import { Character } from "../domain/character";
import { CreateCharacter } from "./createCharacter";

const storeMock = {
  save: jest.fn(),
  get: jest.fn(),
};

const mockInput = {
  name: "",
  species: "",
  class: "",
  level: 0,
  abilityScores: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
};

describe("store character", () => {
  const createCharacter = new CreateCharacter(storeMock);
  it("calls save on store", () => {
    createCharacter.execute(mockInput);

    expect(storeMock.save).toHaveBeenCalled();
    expect(storeMock.save).toHaveBeenCalledWith(
      new Character("", "", "", 0, new AbilityScores(0, 0, 0, 0, 0, 0)),
    );
  });

  it("returns the id", () => {
    const id = "05b86b6c-c349-496a-b94f-a6c3d801ebf5";
    storeMock.save.mockReturnValueOnce(id);
    const result = createCharacter.execute(mockInput);

    expect(result.value.id).toEqual(id);
  });
});
