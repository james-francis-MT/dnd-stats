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
    it("returns default stats when not set", () => {
      const char = new HillDwarf("bob");

      expect(char.scores()).toEqual({
        strength: 15,
        dexterity: 13,
        constitution: 18,
        intelligence: 10,
        wisdom: 14,
        charisma: 8,
      });
    });

    it("returns set scores", () => {
      const char = new HillDwarf("Bob", {
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
        constitution: 3,
        intelligence: 1,
        wisdom: 2,
        charisma: 1,
      });
    });

    it("cannot return over 20", () => {
      const char = new HillDwarf("bob", {
        strength: 15,
        dexterity: 13,
        constitution: 19,
        intelligence: 10,
        wisdom: 12,
        charisma: 8,
      });

      expect(char.scores()).toEqual({
        strength: 15,
        dexterity: 13,
        constitution: 20,
        intelligence: 10,
        wisdom: 13,
        charisma: 8,
      });
    });
  });
});
