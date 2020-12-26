import { v4 as uuidv4 } from 'uuid';
import { persist } from 'mobx-persist';
import { makeAutoObservable } from 'mobx';

import { CharacterSkillsStore } from './skills';
import { CharacterNotesStore } from './note';
import { InventoryStore } from './inventory';
import { CustomCharacterValue, CustomValueOptions } from './custom-value';
import { CharacterAttributesStore } from './attributes';


export class CharacterStore {
  @persist
  id = uuidv4();

  editMode = false;

  @persist
  name = '';

  @persist
  level: number = 1;

  // @persist('list', CustomCharacterValue)
  customValues: CustomCharacterValue[] = [];

  // hitpoints
  maxHitpoints = 20;

  @persist
  hitpoints = this.maxHitpoints;

  @persist
  armorClass: number = 0;

  @persist
  initiative: number = 2;

  @persist
  movement: number = 0;

  @persist
  proficiencyBonus: number = 2;

  @persist('object', InventoryStore)
  inventory = new InventoryStore();

  @persist('object', CharacterAttributesStore)
  attributes = new CharacterAttributesStore();

  @persist('object', CharacterSkillsStore)
  skills = new CharacterSkillsStore();

  @persist('object', CharacterNotesStore)
  notes = new CharacterNotesStore();

  constructor(name?: string) {
    makeAutoObservable(this);

    if (name) {
      this.name = name;
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
    this.movement = movement || 0;
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
