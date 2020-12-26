import { persist } from "mobx-persist";
import { makeAutoObservable } from "mobx";

import { CharacterStore } from "./character";

export class RootStore {
  @persist('list', CharacterStore)
  characters: CharacterStore[] = [];

  @persist
  selectedID: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  createCharacter(name: string) {
    const character = new CharacterStore(name);

    this.characters.push(character);

    return character;
  }

  selectCharacter(id: string) {
    this.selectedID = id;
  }

  removeCharacter(id: string) {
    this.characters = this.characters.filter(c => c.id !== id);
  }

  get character() {
    return this.characters.find(c => c.id === this.selectedID);
  }
}