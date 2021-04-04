import { v4 as uuidv4 } from 'uuid';
import { ignore } from 'mobx-sync';
import { makeAutoObservable } from 'mobx';

import {
  CharacterClass,
  CharacterClassType,
  defaultClasses,
} from '../data/character';

import { CharacterSkillsStore } from './skills';
import { CharacterNotesStore } from './note';
import { InventoryStore } from './inventory';
import { CustomCharacterValue, CustomValueOptions } from './custom-value';
import { CharacterAttributesStore } from './attributes';

export class CharacterStore {
  id = uuidv4();

  @ignore
  editMode = false;

  name = '';
  level: number = 1;

  // hitpoints
  maxHitpoints = 20;
  hitpoints = this.maxHitpoints;
  armorClass: number = 0;
  initiative: number = 2;
  _movement: number = 0;
  proficiencyBonus: number = 2;

  class: CharacterClassType = 'custom';

  inventory = new InventoryStore(this);
  attributes = new CharacterAttributesStore(this);
  skills = new CharacterSkillsStore(this);
  notes = new CharacterNotesStore();

  @ignore
  customValues: CustomCharacterValue[] = [];

  constructor(name?: string) {
    makeAutoObservable(this);

    if (name) {
      this.name = name;
    }
  }

  get passiveWisdom() {
    const score =
      (this?.skills?.values || []).find((skill) => skill.name === 'perception')
        ?.score || 0;

    return score + 10;
  }

  get movement() {
    let movement = this._movement;
    if (this.inventory.isHeavyLoaded) {
      movement -= 6;
    } else if (this.inventory.isLoaded) {
      movement -= 3;
    }
    return movement;
  }

  get classDetails() {
    return defaultClasses.find((dc) => dc.type === this.class);
  }

  get isCustomClass() {
    return !this.class || this.class === 'custom';
  }

  setClass(type: CharacterClassType) {
    this.class = type;

    if (this.classDetails) {
      for (const attribute of this.attributes.values) {
        attribute.isSavingThrow = this.classDetails.savingThrows.includes(
          attribute.name
        );
      }
    }
  }

  createCustomValue(options: CustomValueOptions) {
    this.customValues.push(new CustomCharacterValue(options));
  }

  setHitpoints(hitpoints: number) {
    if (hitpoints >= 0 && hitpoints <= this.maxHitpoints) {
      this.hitpoints = hitpoints;
    }
  }

  setMaxHitpoints(maxHitpoints: number) {
    if (maxHitpoints >= this.hitpoints) {
      this.maxHitpoints = maxHitpoints;
    }
  }

  setName(name: string) {
    this.name = name;
  }

  setLevel(level: number) {
    this.level = level || 0;
  }

  setArmorClass(armorClass: number) {
    this.armorClass = armorClass || 0;
  }

  setMovement(movement: number) {
    this._movement = movement || 0;
  }

  setInitiative(initiative: number) {
    this.initiative = initiative || 0;
  }

  setProficiencyBonus(proficiencyBonus: number) {
    this.proficiencyBonus = proficiencyBonus || 0;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  get hitpointsPercentage() {
    return Math.floor((this.hitpoints / this.maxHitpoints) * 100);
  }
}
