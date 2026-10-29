import { InMemoryCharacterStore } from "../src/gateways/characterStore/inMemoryStore";
import { CreateCharacter } from "../src/useCases/createCharacter";

describe("create character", () => {
  const store = new InMemoryCharacterStore();
  const createCharacter = new CreateCharacter(store);
  const getCharacterSheet = new GetCharacterSheet(store);
  it("with no weapons", () => {
    const input = {
      name: "test",
      species: "human",
      class: "paladin",
      level: 1,
      abilityScores: {
        strength: 15,
        dexterity: 8,
        constitution: 13,
        intelligence: 10,
        wisdom: 12,
        charisma: 14,
      },
    };

    const result = createCharacter.execute(input);

    const characterId = result.value.id;

    const characterSheet = getCharacterSheet.execute({ id: characterId });

    expect(characterSheet).toEqual({
      name: "test",
      species: "human",
      class: "paladin",
      level: 1,
      abilityScores: {
        strength: { score: 15, modifier: 2, savingThrow: 2, proficient: false },
        dexterity: {
          score: 8,
          modifier: -1,
          savingThrow: -1,
          proficient: false,
        },
        constitution: {
          score: 13,
          modifier: 1,
          savingThrow: 1,
          proficient: false,
        },
        intelligence: {
          score: 10,
          modifier: 0,
          savingThrow: 0,
          proficient: false,
        },
        wisdom: { score: 12, modifier: 1, savingThrow: 3, proficient: true },
        charisma: { score: 14, modifier: 2, savingThrow: 4, proficient: true },
      },
      hitpoints: 11,
      armourClass: 9,
      equipped: null,
      weapons: [],
    });
  });
});
