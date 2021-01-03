import { persist } from "mobx-persist";
import { makeAutoObservable } from "mobx";

import i18n from "../i18n";

import { CharacterStore } from "./character";

export class RootStore {
  @persist('list', CharacterStore)
  characters: CharacterStore[] = [];

  @persist language: string = 'de';

  constructor() {
    makeAutoObservable(this);
  }

  createCharacter(name: string) {
    const character = new CharacterStore(name);

    this.characters.push(character);

    return character;
  }

  removeCharacter(id: string) {
    this.characters = this.characters.filter(c => c.id !== id);
  }

  characterById(id: string) {
    return this.characters.find(c => c.id === id);
  }

  setLanguage(lang: string) {
    this.language = lang;
    i18n.changeLanguage(lang);
  }
}