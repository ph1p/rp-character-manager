import { persist } from "mobx-persist";
import { makeAutoObservable } from "mobx";

import { CharacterStore } from "./character";

export class RootStore {
  @persist('list', CharacterStore)
  characters: CharacterStore[] = [];

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
}