import { format } from 'mobx-sync';
import { makeAutoObservable } from 'mobx';

import i18n from '../i18n';

import { CharacterSkill, CharacterSkillsStore } from './skills';
import { CharacterNote, CharacterNotesStore } from './note';
import { InventoryItem, InventoryStore } from './inventory';
import { CharacterStore } from './character';
import { CharacterAttribute, CharacterAttributesStore } from './attributes';

export class RootStore {
  @format<any, any>(
    (data: CharacterStore[]) => {
      return data.map((data) => {
        const character = new CharacterStore();

        for (const key of Object.keys(data)) {
          // @ts-ignore
          character[key] = data[key];
        }

        const inventory = new InventoryStore(character);
        const attributes = new CharacterAttributesStore(character);
        const skills = new CharacterSkillsStore(character);
        const notes = new CharacterNotesStore();

        attributes.values = data.attributes.values.map((attribute) => new CharacterAttribute(attribute, character));
        skills.values = data.skills.values.map((skill) => new CharacterSkill(skill, character));

        inventory.items = data.inventory.items.map(
          (item) => new InventoryItem(item)
        );
        notes.values = data.notes.values.map(
          (note) => new CharacterNote(note.text, note.date, note.id)
        );

        character.inventory = inventory;
        character.attributes = attributes;
        character.skills = skills;
        character.notes = notes;

        return character;
      });
    },
    (characters: CharacterStore[]) => {
      return characters;
    }
  )
  characters: CharacterStore[] = [];

  language: string = 'de';

  constructor() {
    makeAutoObservable(this);
  }

  createCharacter(name: string) {
    const character = new CharacterStore(name);

    this.characters.push(character);

    return character;
  }

  removeCharacter(id: string) {
    this.characters = this.characters.filter((c) => c.id !== id);
  }

  characterById(id: string) {
    return this.characters.find((c) => c.id === id);
  }

  setLanguage(lang: string) {
    this.language = lang;
    i18n.changeLanguage(lang);
  }
}
