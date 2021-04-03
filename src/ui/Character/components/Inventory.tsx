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
import { ContentBox } from '../../../components/ContentBox';
import { Button } from '../../../components/Button';

const InventoryItem: FunctionComponent<{
  item: TInventoryItem;
  remove: (id: string) => void;
}> = observer(({ item, remove }) => {
  const character = useCharacterStore();
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState<string>(item.name || '');
  const [weight, setWeight] = useState<string>(
    ((item.weight as unknown) as string) || '0'
  );

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
            <>
              <Input
                className="mb-2"
                label="Name"
                value={newName}
                onChange={(e) => setNewName(e.currentTarget.value)}
              />
              <Input
                className="mb-2"
                label={t('inventory.weight')}
                value={weight}
                onChange={(e) => setWeight(e.currentTarget.value)}
              />
            </>
          )}
          <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
            {!edit && (
              <>
                <span className="text-sm">{item.quantity} mal</span>
                <span className="text-sm">
                  {' '}
                  - {item.weight || 0} {character.inventory.unit}
                </span>
              </>
            )}
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
          <Button
            small
            filled
            color="green"
            className="mr-2"
            onClick={() => {
              setEdit(false);
              if (newName) {
                item.setName(newName);
                item.setWeight(+weight);
              }
            }}
          >
            {t('save')}
          </Button>

          <Button filled small onClick={() => setEdit(false)}>
            {t('cancel')}
          </Button>
          <Button
            className="ml-auto"
            small
            color="red"
            onClick={() =>
              window.confirm(t('inventory.delete-confirm')) && remove(item.id)
            }
          >
            {t('remove')}
          </Button>
        </div>
      )}
    </div>
  );
});

export const InventoryComponent = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();
  const [formItem, setFormItem] = useState<any>({
    name: '',
    description: '',
    quantity: 1,
  });

  const addItem = (e: SyntheticEvent) => {
    e.preventDefault();
    character.inventory.createItem(formItem);
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
      <ContentBox className="mb-4">
        <h2 className="text-xl">
          Inventar ({character.inventory.totalLoad} {character.inventory.unit}/
          {character.inventory.maxLiftPushPull} {character.inventory.unit})
        </h2>

        <div className="flex justify-between mt-2 pb-3 border-b border-b-1 border-gray-100">
          <div>
            &gt; {character.inventory.maxLoad} {character.inventory.unit}
            <p className="text-gray-500 text-xs uppercase">is loaded</p>
          </div>
          <div>
            &gt; {character.inventory.maxHeavyLoad} {character.inventory.unit}
            <p className="text-gray-500 text-xs uppercase">is max loaded</p>
          </div>

          {character.inventory.isLoaded && (
            <div>
              <div
                className={`block rounded-full text-white bg-red-${
                  character.inventory.isHeavyLoaded ? 600 : 400
                } duration-300 text-xs font-bold px-4 py-2`}
              >
                {character.inventory.isHeavyLoaded ? 'Heavy loaded' : 'Loaded'}
              </div>
            </div>
          )}
        </div>
        <div style={{ maxHeight: 300 }} className="mt-3 mb-4 overflow-y-auto">
          {character.inventory.items.map((item) => (
            <InventoryItem
              key={item.id}
              item={item}
              remove={(id) => character.inventory.remove(id)}
            />
          ))}
        </div>

        <form className="w-full" onSubmit={addItem}>
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
              label={t('inventory.quantity')}
              type="number"
              name="quantity"
              className="flex-none w-14 mr-4"
              placeholder="default: 1"
              value={formItem.quantity}
              onChange={onChange}
            />

            <Input
              label={t('inventory.weight')}
              type="number"
              name="weight"
              className="flex-none w-14"
              placeholder=""
              value={formItem.weight || '0'}
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
      </ContentBox>
    </div>
  );
});
