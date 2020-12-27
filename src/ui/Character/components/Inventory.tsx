import { useTranslation } from 'react-i18next';
import React, {
  ChangeEvent,
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';

import { TInventoryItem, useCharacterStore } from '../../../store';
import { Input } from '../../../components/Input';
import { PencilIcon } from '../../../components/icons/Pencil';

const InventoryItem: FunctionComponent<{
  item: TInventoryItem;
  remove: (id: string) => void;
}> = observer(({ item, remove }) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(item.name);

  useEffect(() => {
    if (item.quantity <= 0) {
      remove(item.id);
    }
  }, [item.id, item.quantity, remove]);

  return (
    <div className="cursor-pointer w-full border-gray-100 rounded-md border-b mb-2 pb-2 last:border-0 last:-mb-2">
      <div className="flex w-full items-center py-2 border-transparent">
        {!edit && (
          <div onClick={() => setEdit(true)} className="h-5 w-5 ml-2 mr-3">
            <PencilIcon />
          </div>
        )}
        <div className="w-full">
          {!edit ? (
            item.name
          ) : (
            <Input
              className="mb-2"
              label="Name"
              defaultValue={newName}
              onChange={(e) => setNewName(e.currentTarget.value)}
            />
          )}
          <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
            {!edit && <span className="text-sm">{item.quantity} mal</span>}
          </div>
        </div>
        {!edit && (
          <div className="flex">
            <button
              className="px-2 bg-gray-200 block-inline rounded-full mr-2 h-6 w-6 text-xs text-center"
              onClick={() => item.increase()}
            >
              +
            </button>
            <button
              className="px-2 bg-gray-200 block-inline rounded-full h-6 w-6 text-xs text-center"
              onClick={() => item.decrease()}
            >
              -
            </button>
          </div>
        )}
      </div>
      {edit && (
        <div className="flex mb-3">
          <button
            className="mr-3 border border-green-500 text-green-500 py-1 px-3 text-xs rounded"
            onClick={() => {
              setEdit(false);
              if (newName) {
                item.setName(newName);
              }
            }}
          >
            {t('save')}
          </button>

          <button
            className="border border-gray-500 text-gray-500 py-1 px-3 text-xs rounded"
            onClick={() => setEdit(false)}
          >
            {t('cancel')}
          </button>
          <button
            className="ml-auto border border-red-500 text-red-500 py-1 px-3 text-xs rounded"
            onClick={() => window.confirm('Wirklich?') && remove(item.id)}
          >
            {t('remove')}
          </button>
        </div>
      )}
    </div>
  );
});

export const InventoryComponent = observer(() => {
  const { t } = useTranslation();
  const store = useCharacterStore();
  const [formItem, setFormItem] = useState<any>({
    name: '',
    description: '',
    quantity: 1,
  });

  const addItem = (e: SyntheticEvent) => {
    e.preventDefault();
    store.inventory.createItem(formItem);
    setFormItem({
      name: '',
      description: '',
      quantity: 1,
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormItem({ ...formItem, [e.currentTarget.name]: e.currentTarget.value });

  return (
    <div>
      <div className="bg-white p-5 rounded-md">
        <h2 className="text-xl">Inventar</h2>
        <div style={{ maxHeight: 300 }} className="mt-3 overflow-y-auto">
          {store.inventory.items.map((item) => (
            <InventoryItem
              key={item.id}
              item={item}
              remove={(id) => store.inventory.remove(id)}
            />
          ))}
        </div>
      </div>
      <div className="bg-white p-5 rounded-md mt-5">
        <form className="w-full max-w-lg" onSubmit={addItem}>
          <div className="flex">
            <Input
              label="Name"
              type="text"
              name="name"
              className="flex-grow w-24 mr-4"
              value={formItem.name}
              onChange={onChange}
            />

            <Input
              label="Anzahl"
              type="number"
              name="quantity"
              className="flex-none w-14"
              placeholder="default: 1"
              value={formItem.quantity}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="w-full mr-5 mt-4 bg-blue-700 text-white py-2 px-6 text-sm rounded"
          >
            {t('inventory.add-item')}
          </button>
        </form>
      </div>
    </div>
  );
});
