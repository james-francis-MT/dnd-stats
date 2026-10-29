const ScoreNames = [
  "STRENGTH",
  "DEXTERITY",
  "CONSTITUTION",
  "INTELLIGENCE",
  "WISDOM",
  "CHARISMA",
] as const;
export type ScoreName = (typeof ScoreNames)[number];

export class AbilityScores {
  private scoreMap: Record<ScoreName, number>;
  constructor(
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
  ) {
    this.scoreMap = {
      STRENGTH: strength,
      DEXTERITY: dexterity,
      CONSTITUTION: constitution,
      INTELLIGENCE: intelligence,
      WISDOM: wisdom,
      CHARISMA: charisma,
    };
  }

  static default() {
    return new AbilityScores(15, 13, 14, 10, 12, 8);
  }

  get(name: ScoreName): { score: number; modifier: number } {
    const score = this.scoreMap[name];
    return { score, modifier: this.modifier(score) };
  }

  addScores(scoresToAdd: AbilityScores): AbilityScores {
    return new AbilityScores(
      this.calculateNewScore(
        this.scoreMap.STRENGTH,
        scoresToAdd.scoreMap.STRENGTH,
      ),
      this.calculateNewScore(
        this.scoreMap.DEXTERITY,
        scoresToAdd.scoreMap.DEXTERITY,
      ),
      this.calculateNewScore(
        this.scoreMap.CONSTITUTION,
        scoresToAdd.scoreMap.CONSTITUTION,
      ),
      this.calculateNewScore(
        this.scoreMap.INTELLIGENCE,
        scoresToAdd.scoreMap.INTELLIGENCE,
      ),
      this.calculateNewScore(this.scoreMap.WISDOM, scoresToAdd.scoreMap.WISDOM),
      this.calculateNewScore(
        this.scoreMap.CHARISMA,
        scoresToAdd.scoreMap.CHARISMA,
      ),
    );
  }

  equals(other: AbilityScores): boolean {
    return (
      this.scoreMap.STRENGTH === other.scoreMap.STRENGTH &&
      this.scoreMap.DEXTERITY === other.scoreMap.DEXTERITY &&
      this.scoreMap.CONSTITUTION === other.scoreMap.CONSTITUTION &&
      this.scoreMap.INTELLIGENCE === other.scoreMap.INTELLIGENCE &&
      this.scoreMap.WISDOM === other.scoreMap.WISDOM &&
      this.scoreMap.CHARISMA === other.scoreMap.CHARISMA
    );
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
