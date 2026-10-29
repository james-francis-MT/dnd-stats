const ScoreNames = [
  "STRENGTH",
  "DEXTERITY",
  "CONSTITUTION",
  "INTELLIGENCE",
  "WISDOM",
  "CHARISMA",
] as const;
export type ScoreNames = (typeof ScoreNames)[number];

export class AbilityScores {
  constructor(
    private strength: number,
    private dexterity: number,
    private constitution: number,
    private intelligence: number,
    private wisdom: number,
    private charisma: number,
  ) {}

  static default() {
    return new AbilityScores(15, 13, 14, 10, 12, 8);
  }

  equals(other: AbilityScores): boolean {
    return (
      this.strength === other.strength &&
      this.dexterity === other.dexterity &&
      this.constitution === other.constitution &&
      this.intelligence === other.intelligence &&
      this.wisdom === other.wisdom &&
      this.charisma === other.charisma
    );
  }

  addScores(scoresToAdd: AbilityScores): AbilityScores {
    return new AbilityScores(
      this.calculateNewScore(this.strength, scoresToAdd.strength),
      this.calculateNewScore(this.dexterity, scoresToAdd.dexterity),
      this.calculateNewScore(this.constitution, scoresToAdd.constitution),
      this.calculateNewScore(this.intelligence, scoresToAdd.intelligence),
      this.calculateNewScore(this.wisdom, scoresToAdd.wisdom),
      this.calculateNewScore(this.charisma, scoresToAdd.charisma),
    );
  }

  toSheet(proficientScores: ScoreNames[]) {
    return {
      strength: this.getScore(
        this.strength,
        proficientScores.includes("STRENGTH"),
      ),
      dexterity: this.getScore(
        this.dexterity,
        proficientScores.includes("DEXTERITY"),
      ),
      constitution: this.getScore(
        this.constitution,
        proficientScores.includes("CONSTITUTION"),
      ),
      intelligence: this.getScore(
        this.intelligence,
        proficientScores.includes("INTELLIGENCE"),
      ),
      wisdom: this.getScore(this.wisdom, proficientScores.includes("WISDOM")),
      charisma: this.getScore(
        this.charisma,
        proficientScores.includes("CHARISMA"),
      ),
    };
  }

  hitpoints(base: number): number {
    return base + this.modifier(this.constitution);
  }

  armourClass(base: number): number {
    return base + this.modifier(this.dexterity);
  }

  private getScore(score: number, proficient: boolean) {
    const modifierValue = this.modifier(score);
    return {
      score: score,
      modifier: modifierValue,
      savingThrow: proficient ? modifierValue + 2 : modifierValue,
      proficient: proficient,
    };
  }

  private modifier(score: number): number {
    return Math.trunc((score - 10) / 2);
  }

  private calculateNewScore(oldScore: number, amount: number) {
    let newScore = (oldScore += amount);
    if (newScore > 20) newScore = 20;
    return newScore;
  }
}
