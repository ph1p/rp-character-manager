import { useHistory, useParams } from 'react-router-dom';
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
  const character = useContext(RootStoreContext) as RootStore & {
    currentCharacter: TCharacterStore;
  };
  const history = useHistory();

  if (!character?.currentCharacter) {
    history.push('/');
    return {} as TCharacterStore;
  }

  return character.currentCharacter;
};

export const StoreProvider = (props: any) => {
  const { id } = useParams<{ id: string }>();

  return (
    <RootStoreContext.Provider
      value={Object.assign(rootStore, {
        currentCharacter: rootStore.characterById(id) || null,
      })}
    >
      {props.children}
    </RootStoreContext.Provider>
  );
};
