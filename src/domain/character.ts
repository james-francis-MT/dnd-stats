import { AbilityScores, ScoreNames } from "./abilityScores";

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
    return {
      name: this.name,
      species: this.species,
      level: this.level,
      class: this.characterClass,
      abilityScores: this.abilityScores.toSheet(this.proficiencies()),
      hitpoints: this.abilityScores.hitpoints(this.hitDie()),
      armourClass: this.abilityScores.armourClass(this.baseArmour()),
      equipped: null,
      weapons: [],
    };
  }

  equals(other: Character): boolean {
    return (
      other.name === this.name && this.abilityScores.equals(other.abilityScores)
    );
  }

  private proficiencies(): ScoreNames[] {
    if (this.characterClass === "paladin") {
      return ["CHARISMA", "WISDOM"];
    }
    return [];
  }

  private hitDie(): number {
    if (this.characterClass === "paladin") {
      return 10;
    }

    return 8;
  }

  private baseArmour(): number {
    return 10;
  }
}
