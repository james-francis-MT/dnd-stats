export class AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  constructor(
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
  ) {
    this.strength = strength;
    this.dexterity = dexterity;
    this.constitution = constitution;
    this.intelligence = intelligence;
    this.wisdom = wisdom;
    this.charisma = charisma;
  }

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
}
