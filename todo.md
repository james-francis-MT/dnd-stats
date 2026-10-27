# D&D Stats App User Stories

Oct 20, 2026 · @James

This backlog covers four capabilities: create characters, create custom weapons, equip weapons to characters, and view total stats. Each story has acceptance criteria and a priority so you can implement it directly.

## Assumptions and scope

I assumed the following where your brief was silent. Change any of them and the stories below still hold, but the numbers in the stat calculations will move.

- **Ruleset:** D&D 5th Edition. Six ability scores (STR, DEX, CON, INT, WIS, CHA), proficiency bonus by level, armour class, and weapon damage dice.
- **Users:** one persona, the **Player**, who manages their own characters. A Dungeon Master persona is out of scope for the first release.
- **Platform:** not fixed. Stories are written to be UI-agnostic, so they work for a web, mobile or desktop build.
- **Accounts:** none in the first release. Data is stored locally, with sign-in treated as a later epic.
- **Weapons belong to the user, not the character.** One custom weapon can be attached to several characters.

Story format: *As a Player, I want X, so that Y.* Priority uses MoSCoW (Must, Should, Could). Sizing is T-shirt (S, M, L).

## Epic overview

There are 28 stories in 4 epics. The 15 Must stories alone make a working first release: a Player can create a character and a weapon, attach one to the other, and see the totals.

| Epic | Stories | Must | Should | Could | Depends on |
| --- | --- | --- | --- | --- | --- |
| 1. Characters (C) | 8 | 4 | 3 | 1 | None |
| 2. Custom weapons (W) | 9 | 5 | 3 | 1 | None |
| 3. Equipping weapons (E) | 4 | 2 | 1 | 1 | Epics 1 and 2 |
| 4. Total stats (S) | 7 | 4 | 2 | 1 | Epics 1, 2 and 3 |

Suggested build order: Epics 1 and 2 in parallel, then Epic 3, then Epic 4. Within each epic, build Must stories first.

## Epic 1: Characters

A Player can create, view, change and remove characters, each with the core numbers the stat calculations depend on.

| ID | User story | Acceptance criteria | Priority | Size |
| --- | --- | --- | --- | --- |
| C-1 | As a Player, I want to create a character with a name, race, class and level, so that I have a sheet to build on. | Name is required and 1 to 50 characters; level is a whole number from 1 to 20; race and class are chosen from a list or typed freely; saved character appears in the character list. | Must | M |
| C-2 | As a Player, I want to enter the six ability scores, so that modifiers can be calculated for me. | Each score accepts a whole number from 1 to 30; modifier is calculated as floor((score - 10) / 2) and shown next to the score; invalid input shows an inline error and blocks saving. | Must | S |
| C-3 | As a Player, I want to see a list of my characters, so that I can pick one to open. | List shows name, race, class and level; list is sorted by most recently edited; empty state explains how to create the first character. | Must | S |
| C-4 | As a Player, I want to edit a character, so that I can fix mistakes or reflect level-ups. | All fields from C-1 and C-2 are editable; saving updates dependent stats immediately; cancelling discards changes. | Must | S |
| C-5 | As a Player, I want to delete a character, so that I can remove ones I no longer play. | Deletion asks for confirmation naming the character; deleting removes the character's equipped-weapon links but not the weapons themselves; deleted character no longer appears in the list. | Should | S |
| C-6 | As a Player, I want proficiency bonus to be set from my level, so that I do not look it up. | Bonus follows the 5e table (+2 at levels 1 to 4, +3 at 5 to 8, +4 at 9 to 12, +5 at 13 to 16, +6 at 17 to 20); changing level updates it; value is shown on the character view. | Should | S |
| C-7 | As a Player, I want to set base armour class and max hit points, so that the sheet reflects my character's durability. | Both fields accept whole numbers of 0 or more; values are shown on the character view; AC feeds the total in S-3. | Should | S |
| C-8 | As a Player, I want to duplicate a character, so that I can make variants quickly. | Copy has the same values with "(copy)" added to the name; equipped weapons are linked to the copy; original is unchanged. | Could | S |

## Epic 2: Custom weapons

A Player builds their own weapons in a personal library. Weapons exist independently of characters, so one weapon can be reused.

| ID | User story | Acceptance criteria | Priority | Size |
| --- | --- | --- | --- | --- |
| W-1 | As a Player, I want to create a custom weapon, so that I can use items from my own campaign. | Required fields are name, damage dice (for example 1d8, 2d6) and damage type; optional fields are description and weapon properties (finesse, versatile, two-handed, ranged); saved weapon appears in the library. | Must | M |
| W-2 | As a Player, I want invalid weapon values rejected, so that stat calculations stay correct. | Dice must match the pattern NdM with N from 1 to 20 and M one of 4, 6, 8, 10, 12, 20; name is 1 to 50 characters; errors appear inline and block saving. | Must | S |
| W-3 | As a Player, I want a magic bonus on a weapon, so that +1, +2 or +3 weapons work. | Bonus is a whole number from -3 to +5, default 0; it is added to both attack and damage in S-2. | Must | S |
| W-4 | As a Player, I want to choose which ability a weapon uses, so that finesse and ranged weapons use DEX. | Options are STR, DEX, or "best of STR and DEX" for finesse; the choice drives the modifier used in S-2; default is STR. | Must | S |
| W-5 | As a Player, I want a weapon to grant extra stat modifiers, so that magic weapons can raise an ability score or AC. | Weapon can hold zero or more modifiers, each targeting one ability score or AC with a whole-number value from -5 to +5; modifiers apply only while the weapon is equipped (see S-3). | Should | M |
| W-6 | As a Player, I want to view my weapon library, so that I can find and reuse weapons. | List shows name, damage dice, damage type and bonus; supports search by name; empty state explains how to create the first weapon. | Must | S |
| W-7 | As a Player, I want to edit a weapon, so that I can correct or rebalance it. | All W-1 to W-5 fields are editable; saving updates every character that has the weapon equipped; edit dialog states how many characters are affected. | Should | S |
| W-8 | As a Player, I want to delete a weapon, so that I can clean up my library. | Confirmation lists characters currently using the weapon; on confirm, the weapon is removed and unequipped from those characters; cancelling changes nothing. | Should | S |
| W-9 | As a Player, I want to duplicate a weapon, so that I can make variants quickly. | Copy has the same values with "(copy)" added to the name; original is unchanged. | Could | S |

## Epic 3: Equipping weapons

A Player attaches weapons from the library to a character. Equipped weapons are what the stat calculations use.

| ID | User story | Acceptance criteria | Priority | Size |
| --- | --- | --- | --- | --- |
| E-1 | As a Player, I want to attach a weapon to a character, so that its numbers count towards that character's stats. | Character view has an "Add weapon" action that opens the library; chosen weapon appears in the character's weapon list; the same weapon can be attached to many characters; attaching the same weapon twice to one character is blocked with a message. | Must | M |
| E-2 | As a Player, I want to remove a weapon from a character, so that I can swap gear. | Remove action on each attached weapon; removal does not delete the weapon from the library; total stats update immediately. | Must | S |
| E-3 | As a Player, I want to mark which attached weapons are equipped, so that I can carry spares without them affecting my stats. | Each attached weapon has an equipped toggle; a character can have at most 2 weapons equipped at once, with a clear message at the limit; only equipped weapons feed S-2 and S-3. | Should | M |
| E-4 | As a Player, I want to see which characters use a weapon, so that I know the impact before editing it. | Weapon detail view lists characters with the weapon attached; each name opens that character. | Could | S |

## Epic 4: Total stats

The app combines a character's base numbers with their equipped weapons and shows the result. This is the core value of the product, so the rules are spelled out here.

| ID | User story | Acceptance criteria | Priority | Size |
| --- | --- | --- | --- | --- |
| S-1 | As a Player, I want a character summary page, so that I see everything at a glance. | Shows name, race, class, level, six ability scores with modifiers, proficiency bonus, AC and max HP; works with zero weapons attached. | Must | M |
| S-2 | As a Player, I want attack and damage figures for each equipped weapon, so that I know what to roll. | Attack bonus = ability modifier + proficiency bonus + weapon magic bonus; damage = weapon dice + ability modifier + weapon magic bonus; shown as for example "+7 to hit, 1d8+4 slashing"; uses the total ability modifier from S-3. | Must | M |
| S-3 | As a Player, I want total stats that include weapon modifiers, so that magic items are counted. | Total ability score = base + sum of modifiers from equipped weapons, capped at 30; total AC = base AC + sum of AC modifiers from equipped weapons; unequipped weapons contribute nothing; ability modifiers are recalculated from the totals. | Must | M |
| S-4 | As a Player, I want totals to update instantly, so that I never see stale numbers. | Changing a character field, a weapon, or an equip toggle refreshes all totals without a manual reload; totals are never stored, only calculated. | Must | S |
| S-5 | As a Player, I want to see how a total was calculated, so that I can trust and check it. | Tapping or hovering a total shows its parts, for example "Base 16 + Ember Longsword +1 = 17"; each part names its source. | Should | M |
| S-6 | As a Player, I want to mark whether I am proficient with a weapon, so that attack bonus is accurate. | Each attached weapon has a proficient toggle, on by default; when off, the proficiency bonus is left out of the attack bonus in S-2. | Should | S |
| S-7 | As a Player, I want to compare two weapons on one character, so that I can choose the better option. | Compare view shows attack bonus and average damage side by side for any two attached weapons, calculated for that character; average damage is the dice average plus modifiers. | Could | M |

### Worked example (use as a test case)

Character: level 5 Fighter, STR 16, base AC 16. Weapon: Ember Longsword, 1d8 slashing, magic bonus +1, uses STR, grants +1 AC, equipped and proficient.

| Figure | Calculation | Result |
| --- | --- | --- |
| STR modifier | floor((16 - 10) / 2) | +3 |
| Proficiency bonus | level 5 | +3 |
| Attack bonus | 3 + 3 + 1 | +7 |
| Damage | 1d8 + 3 + 1 | 1d8+4 slashing |
| Total AC | 16 + 1 | 17 |

## Out of scope, quality needs and open questions

**Out of scope for release 1**

- User accounts, cloud sync and sharing characters or weapons
- Spells, armour, inventory beyond weapons, and class feature automation
- Dungeon Master tools such as encounters and initiative

**Quality needs that apply to every story**

- Data survives closing and reopening the app
- Every form validates input and shows plain-language errors
- All totals come from one calculation module with unit tests, including the worked example above
- Screens are usable by keyboard and screen reader

**Open questions for you**

- [ ] Which platform are you building for (web, mobile, desktop)? It changes how C-3, W-6 and S-5 look, not what they do.
- [ ] Is 5th Edition the right ruleset, or do you need another edition or system?
- [ ] Should weapons be shared between characters (as assumed), or private to one character?
- [ ] Do you want sign-in and cloud storage in a later release?
