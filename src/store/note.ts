import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from 'mobx';

export class CharacterNote {
  id: string;
  text = '';
  date: number;

  constructor(text: string, date?: number, id?: string) {
    makeAutoObservable(this);

    this.id = id || uuidv4();
    this.date = date || new Date().getTime();
    this.text = text;
  }

  setText(text: string) {
    this.text = text;
  }
}

export class CharacterNotesStore {
  values: CharacterNote[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  remove(id: string) {
    this.values = this.values.filter(note => note.id !== id);
  }

  create(text: string, date?: number, id?: string) {
    if (text) {
      this.values.push(new CharacterNote(text, date, id));
    }
  }
}