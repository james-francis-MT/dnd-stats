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

  private calculateNewScore(oldScore: number, amount: number) {
    let newScore = (oldScore += amount);
    if (newScore > 20) newScore = 20;
    return newScore;
  }
}
