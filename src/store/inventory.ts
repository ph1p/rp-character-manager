import { v4 as uuidv4 } from 'uuid';
import { persist } from 'mobx-persist';
import { makeAutoObservable } from 'mobx';

export class InventoryItem {
  @persist name: string = '';
  @persist description: string = '';
  @persist quantity: number = 0;
  @persist id: string = '';
  @persist isAttack: boolean = false;

  constructor(
    item?: InventoryItem
  ) {
    makeAutoObservable(this);

    if (item) {
      this.id = uuidv4();
      this.name = item.name;
      this.description = item.description;
      this.quantity = item.quantity ? parseFloat(item.quantity.toString()) : 1;
    }
  }

  setName(name: string) {
    this.name = name;
  }

  increase() {
    this.quantity += 1;
  }

  decrease() {
    this.quantity -= 1;
  }
}

export class InventoryStore {
  @persist('list', InventoryItem)
  items: InventoryItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  remove(id: string) {
    this.items = this.items.filter((i) => i.id !== id);
  }

  createItem(data: InventoryItem) {
    if (data.name && !this.items.some(item => item.name === data.name)) {
      const item = new InventoryItem(data);

      this.items.push(item);

      return item;
    }
  }
}
