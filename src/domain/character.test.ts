import { Character } from "./character";

describe("character", () => {
  describe("info", () => {
    const char = new Character("bob", "human", "paladin", 1);
    const sheet = char.sheet();

    it("sheet has name", () => {
      expect(sheet.name).toEqual("bob");
    });

    it("sheet has species", () => {
      expect(sheet.species).toEqual("human");
    });
  });
});

// species: "human",
// class: "paladin",
// level: 1,
// abilityScores: {
//   strength: { score: 15, modifier: 2, savingThrow: 2 },
//   dexterity: { score: 8, modifier: -1, savingThrow: -1 },
//   constitution: { score: 13, modifier: 1, savingThrow: 1 },
//   intelligence: { score: 10, modifier: 0, savingThrow: 0 },
//   wisdom: { score: 12, modifier: 1, savingThrow: 3 },
//   charisma: { score: 14, modifier: 2, savingThrow: 4 },
// },
// hitpoints: 11,
// armourClass: 9,
// equipped: null,
// weapons: [],
