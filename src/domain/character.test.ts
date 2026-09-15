import { AbilityScores } from "./abilityScores";
import { Character } from "./character";

describe("character", () => {
  describe("info", () => {
    const char = new Character("bob");
    it("returns name", () => {
      const info = char.info();

      expect(info.name).toEqual("bob");
    });
  });

  describe("scores", () => {
    it("returns default stats when not set", () => {
      const char = new Character("bob");

      expect(char.scores()).toEqual(AbilityScores.default());
    });

    it("returns set scores", () => {
      const char = new Character("Bob", {
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1,
      });

      expect(char.scores()).toEqual({
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1,
      });
    });
  });
});
