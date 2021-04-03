import { v4 as uuidv4 } from 'uuid';
import { ignore } from 'mobx-sync';
import { makeAutoObservable } from 'mobx';

import { CharacterStore } from './character';

export class InventoryItem {
  name: string = '';
  description: string = '';
  quantity: number = 0;
  weight: number = 0;
  id: string = '';
  isAttack: boolean = false;

  constructor(item?: InventoryItem) {
    makeAutoObservable(this);

    if (item) {
      this.id = uuidv4();
      this.name = item.name;
      this.description = item.description;
      this.quantity = item.quantity ? parseFloat(item.quantity.toString()) : 1;
      this.weight = item.weight;
    }
  }

  setName(name: string) {
    this.name = name;
  }

  setWeight(weight: number) {
    this.weight = weight;
  }

  increase() {
    this.quantity += 1;
  }

  decrease() {
    this.quantity -= 1;
  }
}

export class InventoryStore {
  items: InventoryItem[] = [];

  unit: string = 'kg';

  @ignore
  store: CharacterStore;

  constructor(store: CharacterStore) {
    makeAutoObservable(this);
    this.store = store;

    console.log(this);
  }

  remove(id: string) {
    this.items = this.items.filter((i) => i.id !== id);
  }

  get totalLoad() {
    return this.items.reduce(
      (prev, item) => prev + item.quantity * item.weight,
      0
    );
  }

  get maxLoad() {
    const strength =
      this.store.attributes.values.find(
        (attribute) => attribute.name === 'strength'
      )?.score || 0;
    return strength * 5;
  }

  get maxHeavyLoad() {
    const strength =
      this.store.attributes.values.find(
        (attribute) => attribute.name === 'strength'
      )?.score || 0;
    return strength * 10;
  }

  get isLoaded() {
    return this.totalLoad > this.maxLoad;
  }

  get isHeavyLoaded() {
    return this.totalLoad > this.maxHeavyLoad;
  }

  get maxLiftPushPull() {
    const strength =
      this.store.attributes.values.find(
        (attribute) => attribute.name === 'strength'
      )?.score || 0;
    return strength * 15;
  }

  createItem(data: InventoryItem) {
    if (data.name && !this.items.some((item) => item.name === data.name)) {
      const item = new InventoryItem(data);

      this.items.push(item);

      return item;
    }
  }
}
