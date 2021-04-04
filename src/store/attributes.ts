import { ignore } from 'mobx-sync';
import { makeAutoObservable } from 'mobx';

import { Attributes, defaultAttributes } from '../data/character';

import { CharacterStore } from './character';

export class CharacterAttribute {
  score: number = 0;
  name: Attributes = 'charisma';
  extraScore: number = 0;
  isSavingThrow: boolean = false;

  @ignore
  store: CharacterStore;

  constructor(attributes: CharacterAttribute, store: CharacterStore) {
    makeAutoObservable(this);
    this.store = store;
    Object.assign(this, attributes);
  }

  get modifier() {
    // (score +  extra score) - 10 / 2
    return Math.floor((this.score + this.extraScore - 10) / 2) || 0;
  }

  get savingThrow() {
    if (this.isSavingThrow) {
      return this.store.proficiencyBonus + this.modifier;
    }
    return this.modifier;
  }

  setScore(score: number | string) {
    const inputValue = typeof score === 'number' ? score : parseInt(score, 10);
    this.score = isNaN(inputValue) ? 0 : inputValue;
  }

  setExtraScore(score: number | string) {
    const inputValue = typeof score === 'number' ? score : parseInt(score, 10);
    this.extraScore = isNaN(inputValue) ? 0 : inputValue;
  }

  toggleSaveThrow() {
    this.isSavingThrow = !this.isSavingThrow;
  }
}

export class CharacterAttributesStore {
  values: CharacterAttribute[] = [];
  @ignore
  store: CharacterStore;

  constructor(store: CharacterStore) {
    makeAutoObservable(this);

    this.store = store;

    if (this.values.length === 0) {
      for (const attribute of defaultAttributes as CharacterAttribute[]) {
        this.create(attribute);
      }
    }
  }

  getModifier(name: Attributes) {
    return this.values.find((skill) => skill.name === name)?.modifier || 0;
  }

  create(data: CharacterAttribute) {
    this.values.push(new CharacterAttribute(data, this.store));
  }
}
