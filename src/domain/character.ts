import { AbilityScores } from "./abilityScores";

type CharacterInfo = {
  name: string;
};

export class Character {
  private name: string;
  private abilityScores: AbilityScores;

  constructor(name: string, scores?: AbilityScores) {
    this.name = name;
    this.abilityScores = scores || {
      strength: 15,
      dexterity: 13,
      constitution: 14,
      intelligence: 10,
      wisdom: 12,
      charisma: 8,
    };
  }

  toEqual(other: Character): any {
    return other.name === this.name;
  }

  info(): CharacterInfo {
    return { name: this.name };
  }

  scores(): AbilityScores {
    return this.abilityScores;
  }
}
