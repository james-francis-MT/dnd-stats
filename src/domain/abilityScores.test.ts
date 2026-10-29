import { AbilityScores } from "./abilityScores";

describe("ability scores", () => {
  it("adds scores", () => {
    const scores = new AbilityScores(0, 0, 0, 0, 0, 0);

    expect(scores.addScores(new AbilityScores(1, 2, 3, 4, 5, 6))).toEqual(
      new AbilityScores(1, 2, 3, 4, 5, 6),
    );
  });

  it("max at 20", () => {
    const scores = new AbilityScores(20, 20, 20, 20, 20, 20);

    expect(scores.addScores(new AbilityScores(1, 1, 1, 1, 1, 1))).toEqual(
      new AbilityScores(20, 20, 20, 20, 20, 20),
    );
  });

  describe("get score", () => {
    it("returns value and modifier", () => {
      const scores = AbilityScores.default();

      expect(scores.get("STRENGTH")).toEqual({ score: 15, modifier: 2 });
    });
  });
});
