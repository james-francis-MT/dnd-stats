import { AbilityScores } from "./abilityScores";
import { Character } from "./character";

describe("character", () => {
  describe("sheet", () => {
    const abilityScores = new AbilityScores(15, 8, 13, 10, 12, 14);
    const char = new Character("bob", "human", "paladin", 1, abilityScores);
    const sheet = char.sheet();

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
      expect(sheet.abilityScores).toEqual({
        strength: expect.objectContaining({
          score: 15,
          modifier: 2,
          savingThrow: 2,
          proficient: false,
        }),
        dexterity: expect.objectContaining({
          score: 8,
          modifier: -1,
          savingThrow: -1,
          proficient: false,
        }),
        constitution: expect.objectContaining({
          score: 13,
          modifier: 1,
          savingThrow: 1,
          proficient: false,
        }),
        intelligence: expect.objectContaining({
          score: 10,
          modifier: 0,
          savingThrow: 0,
          proficient: false,
        }),
        wisdom: expect.objectContaining({
          score: 12,
          modifier: 1,
          savingThrow: 3,
          proficient: true,
        }),
        charisma: expect.objectContaining({
          score: 14,
          modifier: 2,
          savingThrow: 4,
          proficient: true,
        }),
      });
    });

    it("has hitpoints", () => {
      expect(sheet.hitpoints).toEqual(11);
    });
    it("has armourClass", () => {
      expect(sheet.armourClass).toEqual(9);
    });
    it("has equipped", () => {
      expect(sheet.equipped).toBeNull();
    });
    it("has weapons", () => {
      expect(sheet.weapons).toEqual([]);
    });
  });
});
