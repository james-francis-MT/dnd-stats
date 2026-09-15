import { AbilityScores } from "./abilityScores";

const DEFAULT_SCORES: AbilityScores = {
  strength: 15,
  dexterity: 13,
  constitution: 14,
  intelligence: 10,
  wisdom: 12,
  charisma: 8,
};

type CharacterInfo = {
  name: string;
};

export class Character {
  private name: string;
  protected abilityScores: AbilityScores;

  constructor(name: string, scores?: AbilityScores) {
    this.name = name;
    this.abilityScores = scores || DEFAULT_SCORES;
  }

  toEqual(other: Character): any {
    return (
      other.name === this.name && other.abilityScores === this.abilityScores
    );
  }

  info(): CharacterInfo {
    return { name: this.name };
  }

  scores(): AbilityScores {
    return this.abilityScores;
  }
}
