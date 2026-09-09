import { Character } from "./character";

describe("character", () => {
  describe("stats", () => {
    const char = new Character("bob");
    it("returns name", () => {
      const stats = char.stats();

      expect(stats.name).toEqual("bob");
    });
  });
});
