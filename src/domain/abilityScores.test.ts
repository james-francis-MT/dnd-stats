import { AbilityScores } from "./abilityScores";

describe("ability scores", () => {
  it("increases scores", () => {
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

  describe("to sheet", () => {
    it("to sheet", () => {
      const scores = new AbilityScores(15, 8, 13, 10, 12, 14);

      expect(scores.toSheet([])).toEqual({
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
        wisdom: { score: 12, modifier: 1, savingThrow: 1, proficient: false },
        charisma: { score: 14, modifier: 2, savingThrow: 2, proficient: false },
      });
    });

    it("proficiency", () => {
      const scores = new AbilityScores(15, 8, 13, 10, 12, 14);

      expect(scores.toSheet(["STRENGTH"]).strength).toEqual({
        score: 15,
        modifier: 2,
        savingThrow: 4,
        proficient: true,
      });
    });
  });

  describe("hitpoints", () => {
    it("return base plus modifier", () => {
      const scores = new AbilityScores(0, 0, 12, 0, 0, 0);

      expect(scores.hitpoints(10)).toEqual(11);
    });
  });

  describe("armour class", () => {
    it("return base plus modifier", () => {
      const scores = new AbilityScores(0, 12, 0, 0, 0, 0);

      expect(scores.armourClass(10)).toEqual(11);
    });
  });
});
