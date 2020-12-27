import { v4 as uuidv4 } from 'uuid';
import { persist } from 'mobx-persist';
import { makeAutoObservable } from 'mobx';

export class CharacterNote {
  @persist id: string;
  @persist text = '';
  @persist date: number;

  constructor(text: string) {
    makeAutoObservable(this);

    this.id = uuidv4();
    this.date = new Date().getTime();
    this.text = text;
  }

  setText(text: string) {
    this.text = text;
  }
}

export class CharacterNotesStore {
  @persist('list', CharacterNote)
  values: CharacterNote[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  remove(id: string) {
    this.values = this.values.filter(note => note.id !== id);
  }

  create(text: string) {
    if (text) {
      this.values.push(new CharacterNote(text));
    }
  }
}