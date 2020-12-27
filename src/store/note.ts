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
  _notes: CharacterNote[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get values() {
    return this._notes.slice().sort((b, a) => a.date - b.date)
  }

  remove(id: string) {
    this._notes = this._notes.filter(note => note.id !== id);
  }

  create(text: string) {
    if (text) {
      this._notes.push(new CharacterNote(text));
    }
  }
}