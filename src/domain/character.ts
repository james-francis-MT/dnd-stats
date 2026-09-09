type CharacterInfo = {
  name: string;
};

export class Character {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  toEqual(other: Character): any {
    return other.name === this.name;
  }

  info(): CharacterInfo {
    return { name: this.name };
  }
}
