import { ignore } from 'mobx-sync';
import { makeAutoObservable } from 'mobx';

import { Skills, Attributes, defaultSkills } from '../data/character';

import { CharacterStore } from './character';

export class CharacterSkill {
  attribute: Attributes = 'charisma';
  name: Skills = 'acrobatics';
  practiced: boolean = false;
  bonusValue: number = 0;

  @ignore
  store: CharacterStore;

  constructor(attributes: CharacterSkill, store: CharacterStore) {
    makeAutoObservable(this);

    this.store = store;

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

    return (
      this.bonusValue +
      this.store.attributes.getModifier(this.attribute) +
      (this.practiced ? this.store.proficiencyBonus : 0)
    );
  }
}

export class CharacterSkillsStore {
  values: CharacterSkill[] = [];
  @ignore
  store: CharacterStore;

  constructor(store: CharacterStore) {
    makeAutoObservable(this);

    this.store = store;

    if (this.values.length === 0) {
      for (const skill of defaultSkills as CharacterSkill[]) {
        this.create(skill);
      }
    }
  }

  create(data: CharacterSkill) {
    this.values.push(new CharacterSkill(data, this.store));
  }
}
