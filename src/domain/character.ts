import { AbilityScores } from "./abilityScores";

export class Character {
  private name: string;
  private species: string;
  private characterClass: string;
  private level: number;
  protected abilityScores: AbilityScores;

  constructor(
    name: string,
    species: string,
    characterClass: string,
    level: number,
    scores?: AbilityScores,
  ) {
    this.name = name;
    this.species = species;
    this.characterClass = characterClass;
    this.level = level;
    this.abilityScores = scores || AbilityScores.default();
  }

  sheet() {
    return { name: this.name, species: this.species };
  }

  equals(other: Character): boolean {
    return (
      other.name === this.name && this.abilityScores.equals(other.abilityScores)
    );
  }
}
