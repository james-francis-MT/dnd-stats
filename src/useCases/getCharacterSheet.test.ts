import { randomUUID } from "crypto";
import { AbilityScores } from "../domain/abilityScores";
import { Character } from "../domain/character";
import { GetCharacterSheet } from "./getCharacterSheet";

const storeMock = {
  save: jest.fn(),
  get: jest.fn(),
};

const mockCharacter = new Character(
  "test",
  "human",
  "paladin",
  1,
  AbilityScores.default(),
);

describe("character sheet", () => {
  const getCharacterSheet = new GetCharacterSheet(storeMock);

  it("gets sheet from character", () => {
    storeMock.get.mockReturnValue(mockCharacter);

    const result = getCharacterSheet.execute({ id: randomUUID() });

    expect(result.value.sheet).toEqual({
      name: "test",
      species: "human",
      level: 1,
      class: "paladin",
      abilityScores: {
        strength: { score: 15, modifier: 2, savingThrow: 2, proficient: false },
        dexterity: {
          score: 13,
          modifier: 1,
          savingThrow: 1,
          proficient: false,
        },
        constitution: {
          score: 14,
          modifier: 2,
          savingThrow: 2,
          proficient: false,
        },
        intelligence: {
          score: 10,
          modifier: 0,
          savingThrow: 0,
          proficient: false,
        },
        wisdom: { score: 12, modifier: 1, savingThrow: 3, proficient: true },
        charisma: { score: 8, modifier: -1, savingThrow: 1, proficient: true },
      },
      hitpoints: 12,
      armourClass: 11,
      equipped: null,
      weapons: [],
    });
  });
});
