import { AbilityScores } from "./abilityScores";

type CharacterInfo = {
  name: string;
};

export class Character {
  private name: string;
  protected abilityScores: AbilityScores;

  constructor(name: string, scores?: AbilityScores) {
    this.name = name;
    this.abilityScores = scores || AbilityScores.default();
  }

  equals(other: Character): boolean {
    return (
      other.name === this.name && this.abilityScores.equals(other.abilityScores)
    );
  }

  info(): CharacterInfo {
    return { name: this.name };
  }

  scores(): AbilityScores {
    return this.abilityScores;
  }
}
