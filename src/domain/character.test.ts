import { AbilityScores } from "./abilityScores";
import { Character } from "./character";

describe("character", () => {
  describe("sheet", () => {
    const abilityScores = new AbilityScores(15, 8, 13, 10, 12, 14);
    const char = new Character("bob", "human", "paladin", 1, abilityScores);
    const sheet = char.basicInfo();

    it("has name", () => {
      expect(sheet.name).toEqual("bob");
    });

    it("has species", () => {
      expect(sheet.species).toEqual("human");
    });

    it("has level", () => {
      expect(sheet.level).toEqual(1);
    });

    it("has level", () => {
      expect(sheet.class).toEqual("paladin");
    });

    it("has ability score scores", () => {
      expect(char.getStat("STRENGTH")).toEqual({
        score: 15,
        modifier: 2,
        savingThrow: 2,
        proficient: false,
      });
    });
  });

  it("returns hitpoints", () => {
    const abilityScores = new AbilityScores(15, 8, 13, 10, 12, 14);
    const char = new Character("bob", "human", "paladin", 1, abilityScores);

    expect(char.hitpoints()).toEqual(11);
  });

  it("returns armour class", () => {
    const abilityScores = new AbilityScores(15, 8, 13, 10, 12, 14);
    const char = new Character("bob", "human", "paladin", 1, abilityScores);

    expect(char.armourClass()).toEqual(9);
  });
});
