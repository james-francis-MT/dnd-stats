import { AbilityScores } from "./abilityScores";
import { Character } from "./character";

export class HillDwarf extends Character {
  constructor(name: string, scores?: AbilityScores) {
    super(name, scores);
    this.addRaceBonus();
  }

  private addRaceBonus() {
    this.abilityScores = this.abilityScores.addScores(
      new AbilityScores(0, 0, 2, 0, 1, 0),
    );
  }
}
