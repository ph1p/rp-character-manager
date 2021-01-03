import { persist } from 'mobx-persist';
import { makeAutoObservable } from 'mobx';

import defaultAttributes from '../data/attributes.json';

import { rootStore } from '.';

// import { rootStore } from '.';

export type Attributes = 'strength' |
  'dexterity' |
  'constitution' |
  'intelligence' |
  'wisdom' |
  'charisma' | undefined;

export class CharacterAttribute {
  @persist score: number = 0;
  @persist name: Attributes;
  @persist extraScore: number = 0;
  @persist isSavingThrow: boolean = false;

  constructor(attributes: CharacterAttribute) {
    makeAutoObservable(this);
    Object.assign(this, attributes);
  }

  get modifier() {
    // (score +  extra score) - 10 / 2
    return Math.floor(((this.score + this.extraScore) - 10) / 2) || 0;
  }

  savingThrow(id: string) {
    const char = rootStore.characterById(id);
    if (this.isSavingThrow && char) {
      return char.proficiencyBonus + this.modifier;
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
  @persist('list', CharacterAttribute)
  values: CharacterAttribute[] = [];

  constructor() {
    makeAutoObservable(this);

    if (this.values.length === 0) {
      for (const attribute of defaultAttributes.values as CharacterAttribute[]) {
        this.create(attribute);
      }
    }
  }

  getScore(name: Attributes) {
    return this.values.find(skill => skill.name === name)?.score || 0;
  }

  getModifier(name: Attributes) {
    return this.values.find(skill => skill.name === name)?.modifier || 0;
  }

  create(data: CharacterAttribute) {
    this.values.push(new CharacterAttribute(data));
  }
}
