import { UUID } from "crypto";
import { CharacterStore } from "../gateways/characterStore/characterStore";
import { Result } from "../utils/result";

type StatDTO = {
  score: number;
  modifier: number;
  savingThrow: number;
  proficient: boolean;
};

type SheetDTO = {
  name: string;
  species: string;
  level: number;
  class: string;
  abilityScores: Record<
    | "strength"
    | "dexterity"
    | "constitution"
    | "intelligence"
    | "wisdom"
    | "charisma",
    StatDTO
  >;
  hitpoints: number;
  armourClass: number;
  equipped: null;
  weapons: never[];
};

export class GetCharacterSheet {
  constructor(private readonly store: CharacterStore) {}

  execute(input: { id: UUID }): Result<{ sheet: SheetDTO }> {
    const character = this.store.get(input.id);

    return {
      success: true,
      value: {
        sheet: {
          ...character.basicInfo(),
          abilityScores: {
            strength: character.getStat("STRENGTH"),
            dexterity: character.getStat("DEXTERITY"),
            constitution: character.getStat("CONSTITUTION"),
            intelligence: character.getStat("INTELLIGENCE"),
            wisdom: character.getStat("WISDOM"),
            charisma: character.getStat("CHARISMA"),
          },
          hitpoints: character.hitpoints(),
          armourClass: character.armourClass(),
          equipped: null,
          weapons: [],
        },
      },
    };
  }
}
