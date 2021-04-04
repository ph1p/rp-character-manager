export type CharacterClassType =
  | 'custom'
  | 'barbarian'
  | 'bard'
  | 'druid'
  | 'cleric'
  | 'fighter'
  | 'monk'
  | 'paladin'
  | 'ranger'
  | 'rogue'
  | 'sorcerer'
  | 'warlock'
  | 'wizard';

export type Attributes =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export type Skills =
  | 'acrobatics'
  | 'arcana'
  | 'athletics'
  | 'performance'
  | 'intimidation'
  | 'sleightOfHand'
  | 'history'
  | 'medicine'
  | 'stealth'
  | 'animalHandling'
  | 'insight'
  | 'investigation'
  | 'nature'
  | 'religion'
  | 'deception'
  | 'survival'
  | 'persuasion'
  | 'perception';

export interface CharacterClass {
  dice: number;
  type: CharacterClassType;
  savingThrows: Attributes[];
  primaryAttribute: Attributes[];
}

export const skills: Skills[] = [
  'acrobatics',
  'arcana',
  'athletics',
  'performance',
  'intimidation',
  'sleightOfHand',
  'history',
  'medicine',
  'stealth',
  'animalHandling',
  'insight',
  'investigation',
  'nature',
  'religion',
  'deception',
  'survival',
  'persuasion',
  'perception',
];

export const attributes: Attributes[] = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

export const types: CharacterClassType[] = [
  'custom',
  'barbarian',
  'bard',
  'druid',
  'cleric',
  'fighter',
  'monk',
  'paladin',
  'ranger',
  'rogue',
  'sorcerer',
  'warlock',
  'wizard',
];

export const defaultAttributes = [
  {
    score: 8,
    name: 'strength',
    extraScore: 0,
    isSavingThrow: false,
  },
  {
    score: 14,
    name: 'dexterity',
    extraScore: 0,
    isSavingThrow: false,
  },
  {
    score: 15,
    name: 'constitution',
    extraScore: 0,
    isSavingThrow: false,
  },
  {
    score: 16,
    name: 'intelligence',
    extraScore: 0,
    isSavingThrow: true,
  },
  {
    score: 13,
    name: 'wisdom',
    extraScore: 0,
    isSavingThrow: true,
  },
  {
    score: 8,
    name: 'charisma',
    extraScore: 0,
    isSavingThrow: false,
  },
];

export const defaultSkills = [
  {
    attribute: 'dexterity',
    name: 'acrobatics',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'intelligence',
    name: 'arcana',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'strength',
    name: 'athletics',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'charisma',
    name: 'performance',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'charisma',
    name: 'intimidation',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'dexterity',
    name: 'sleightOfHand',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'intelligence',
    name: 'history',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'wisdom',
    name: 'medicine',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'dexterity',
    name: 'stealth',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'wisdom',
    name: 'animalHandling',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'wisdom',
    name: 'insight',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'intelligence',
    name: 'investigation',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'intelligence',
    name: 'nature',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'intelligence',
    name: 'religion',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'charisma',
    name: 'deception',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'wisdom',
    name: 'survival',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'charisma',
    name: 'persuasion',
    practiced: false,
    bonusValue: 0,
  },
  {
    attribute: 'wisdom',
    name: 'perception',
    practiced: false,
    bonusValue: 0,
  },
];

export const defaultClasses: CharacterClass[] = [
  {
    dice: 12,
    type: 'barbarian',
    savingThrows: ['strength', 'constitution'],
    primaryAttribute: ['strength'],
  },
  {
    dice: 8,
    type: 'bard',
    savingThrows: ['dexterity', 'charisma'],
    primaryAttribute: ['charisma'],
  },
  {
    dice: 8,
    type: 'cleric',
    savingThrows: ['wisdom', 'charisma'],
    primaryAttribute: ['wisdom'],
  },
  {
    dice: 8,
    type: 'druid',
    savingThrows: ['intelligence', 'charisma'],
    primaryAttribute: ['wisdom'],
  },
  {
    dice: 10,
    type: 'fighter',
    savingThrows: ['strength', 'constitution'],
    primaryAttribute: ['strength', 'dexterity'],
  },
  {
    dice: 8,
    type: 'monk',
    savingThrows: ['strength', 'dexterity'],
    primaryAttribute: ['dexterity', 'wisdom'],
  },
  {
    dice: 10,
    type: 'paladin',
    savingThrows: ['wisdom', 'charisma'],
    primaryAttribute: ['strength', 'charisma'],
  },
  {
    dice: 10,
    type: 'ranger',
    savingThrows: ['strength', 'dexterity'],
    primaryAttribute: ['dexterity', 'wisdom'],
  },
  {
    dice: 8,
    type: 'rogue',
    savingThrows: ['dexterity', 'intelligence'],
    primaryAttribute: ['dexterity'],
  },
  {
    dice: 6,
    type: 'sorcerer',
    savingThrows: ['constitution', 'charisma'],
    primaryAttribute: ['charisma'],
  },
  {
    dice: 8,
    type: 'warlock',
    savingThrows: ['wisdom', 'charisma'],
    primaryAttribute: ['charisma'],
  },
  {
    dice: 6,
    type: 'wizard',
    savingThrows: ['intelligence', 'wisdom'],
    primaryAttribute: ['intelligence'],
  },
];
