import { Character } from "./character";

describe("character", () => {
  describe("info", () => {
    const char = new Character("bob");
    it("returns name", () => {
      const info = char.info();

      expect(info.name).toEqual("bob");
    });
  });
});
