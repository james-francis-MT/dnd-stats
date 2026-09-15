import { AbilityScores } from "./abilityScores";
import { HillDwarf } from "./hillDwarf";

describe("hill dwarf", () => {
  describe("info", () => {
    const char = new HillDwarf("bob");
    it("returns name", () => {
      const info = char.info();

      expect(info.name).toEqual("bob");
    });
  });

  describe("scores", () => {
    it("returns set scores plus bonus", () => {
      const char = new HillDwarf("Bob", new AbilityScores(1, 1, 1, 1, 1, 1));

      expect(char.scores()).toEqual({
        strength: 1,
        dexterity: 1,
        constitution: 3,
        intelligence: 1,
        wisdom: 2,
        charisma: 1,
      });
    });

    it("cannot return over 20", () => {
      const char = new HillDwarf(
        "bob",
        new AbilityScores(15, 13, 19, 10, 12, 8),
      );

      expect(char.scores()).toEqual(new AbilityScores(15, 13, 20, 10, 13, 8));
    });
  });
});
