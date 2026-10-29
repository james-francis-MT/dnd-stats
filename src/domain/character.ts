import { AbilityScores, ScoreName } from "./abilityScores";

export class Character {
  private name: string;
  private species: string;
  private characterClass: string;
  private level: number;
  private readonly abilityScores: AbilityScores;

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

  basicInfo() {
    return {
      name: this.name,
      species: this.species,
      level: this.level,
      class: this.characterClass,
    };
  }

  getStat(name: ScoreName): {
    score: number;
    modifier: number;
    savingThrow: number;
    proficient: boolean;
  } {
    const isProficient = this.proficiencies().includes(name);
    const score = this.abilityScores.get(name);
    const baseModifier = score.modifier;
    const savingThrow = isProficient
      ? baseModifier + this.proficiencyBonus()
      : baseModifier;

    return {
      score: score.score,
      modifier: score.modifier,
      savingThrow: savingThrow,
      proficient: isProficient,
    };
  }

  hitpoints(): number {
    const conMod = this.abilityScores.get("CONSTITUTION").modifier;
    return this.hitDie() + conMod;
  }

  private hitDie(): number {
    return 10;
  }

  armourClass(): number {
    return this.abilityScores.get("DEXTERITY").modifier + 10;
  }

  private proficiencies(): ScoreName[] {
    if (this.characterClass === "paladin") {
      return ["CHARISMA", "WISDOM"];
    }
    return [];
  }

  private proficiencyBonus(): number {
    return 2;
  }

  equals(other: Character): boolean {
    return (
      other.name === this.name && this.abilityScores.equals(other.abilityScores)
    );
  }
}
