import { AbilityScores } from "./abilityScores";

type CharacterInfo = {
  name: string;
};

export class Character {
  private name: string;
  private abilityScores: AbilityScores;

  constructor(name: string, scores?: AbilityScores) {
    this.name = name;
    this.abilityScores = scores || { strength: 15, dexterity: 13 };
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
