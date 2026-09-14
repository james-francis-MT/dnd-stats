import { AbilityScores } from "./abilityScores";
import { Character } from "./character";

export class HillDwarf extends Character {
  constructor(name: string, scores?: AbilityScores) {
    super(name, scores);
    this.addRaceBonus();
  }

  private addRaceBonus() {
    this.abilityScores.constitution += 2;
    if (this.abilityScores.constitution > 20)
      this.abilityScores.constitution = 20;

    this.abilityScores.wisdom += 1;
    if (this.abilityScores.wisdom > 20) this.abilityScores.wisdom = 20;
  }
}
