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

      expect(char.scores()).toEqual({ strength: 15, dexterity: 13 });
    });
  });
});
