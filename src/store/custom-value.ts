import { v4 as uuidv4 } from 'uuid';
import { makeAutoObservable } from 'mobx';

export interface CustomValueOptions {
  isIncreaseable: boolean;
  hasProgress: boolean;
}

export class CustomCharacterValue {
  id: string;
  name = '';
  value: any;

  isIncreaseable: boolean;
  hasProgress: boolean;

  constructor({ isIncreaseable = true, hasProgress = false }) {
    makeAutoObservable(this);

    this.id = uuidv4();

    this.isIncreaseable = isIncreaseable;
    this.hasProgress = hasProgress;
  }

  setName(name: string) {
    this.name = name;
  }

  setValue(value: any) {
    this.value = value;
  }
}
