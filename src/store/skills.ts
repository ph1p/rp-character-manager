


import { persist } from 'mobx-persist';
import { makeAutoObservable } from 'mobx';

import defaultSkills from '../data/skills.json';

import { Attributes } from './attributes';

import { rootStore } from '.';

export type Skills = 'acrobatics' |
  'arcana' |
  'athletics' |
  'performance' |
  'intimidation' |
  'sleightOfHand' |
  'history' |
  'medicine' |
  'stealth' |
  'animalHandling' |
  'insight' |
  'investigation' |
  'nature' |
  'religion' |
  'deception' |
  'survival' |
  'persuasion' |
  'perception' | undefined;

export class CharacterSkill {
  @persist attribute: Attributes;
  @persist name: Skills;
  @persist practiced: boolean = false;
  @persist bonusValue: number = 0;

  constructor(attributes: CharacterSkill) {
    makeAutoObservable(this);

    Object.assign(this, attributes);
  }

  setBonusValue(value: number | string) {
    const inputValue = typeof value === 'number' ? value : parseInt(value, 10);
    this.bonusValue = isNaN(inputValue) ? 0 : inputValue;
  }

  togglePracticed() {
    this.practiced = !this.practiced;
  }

  get score() {
    // bonus +  attribute modifier + proficiency bonus
    if (rootStore.character) {
      return this.bonusValue + rootStore.character.attributes.getModifier(this.attribute) + (this.practiced ? rootStore.character.proficiencyBonus : 0);
    }
    return 0;
  }
}


export class CharacterSkillsStore {
  @persist('list', CharacterSkill)
  values: CharacterSkill[] = [];

  constructor() {
    makeAutoObservable(this);

    if (this.values.length === 0) {
      for (const skill of defaultSkills.values as CharacterSkill[]) {
        this.create(skill);
      }
    }
  }

  create(data: CharacterSkill) {
    this.values.push(new CharacterSkill(data));
  }
}
