import { v4 as uuidv4 } from 'uuid';
import { persist } from 'mobx-persist';
import { makeAutoObservable } from 'mobx';

export class CharacterNote {
  @persist id: string;
  @persist text = '';
  @persist date: number;

  constructor(private notesStore: CharacterNotesStore, text: string) {
    makeAutoObservable(this);

    this.id = uuidv4();
    this.date = new Date().getTime();
    this.text = text;
  }

  remove() {
    this.notesStore._notes = this.notesStore._notes.filter(note => note.id !== this.id);
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

  create(text: string) {
    if (text) {
      this._notes.push(new CharacterNote(this, text));
    }
  }
}