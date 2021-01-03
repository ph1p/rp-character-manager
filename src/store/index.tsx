import { useHistory } from 'react-router-dom';
import { createContext, useContext } from 'react';

import { RootStore } from './root';
import { InventoryItem, InventoryStore } from './inventory';
import { CustomCharacterValue } from './custom-value';
import { CharacterStore } from './character';

export type TRootStore = InstanceType<typeof RootStore>;
export type TCharacterStore = InstanceType<typeof CharacterStore>;
export type TInventoryItem = InstanceType<typeof InventoryItem>;
export type TCustomCharacterValue = InstanceType<typeof CustomCharacterValue>;
export type TInventoryStore = InstanceType<typeof InventoryStore>;

const RootStoreContext = createContext<TRootStore | undefined>(undefined);

export const rootStore = new RootStore();

export const useStore = (): TRootStore => {
  const store = useContext(RootStoreContext);

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};

export const useCharacterStore = (): TCharacterStore => {
  const store = useContext(RootStoreContext);
  const history = useHistory();

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  const character = store.character;

  if (!character) {
    store.selectCharacter('');
    history.push('/');
    throw new Error('Character not found.');
  }

  return character;
};

export const WithMobX = (WrappedComponent: any) => {
  return (props: any) => (
    <RootStoreContext.Provider value={rootStore}>
      <WrappedComponent {...props} />
    </RootStoreContext.Provider>
  );
};
