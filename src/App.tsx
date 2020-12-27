import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Character } from './ui/Character';
import { useStore } from './store';
import { Select } from './components/Select';
import { Modal } from './components/Modal';
import { Input } from './components/Input';
import { Button } from './components/Button';

export default observer(() => {
  const { t } = useTranslation();
  const store = useStore();
  const [name, setName] = useState('');
  const [open, setOpen] = useState(!store.selectedID);

  useEffect(() => {
    setOpen(!store.selectedID);
  }, [store.selectedID]);

  return (
    <>
      <Modal
        className="w-3/4 lg:w-1/3"
        open={open}
        onClose={() => store.selectedID && setOpen(!open)}
      >
        <>
          <Select
            label="Bestehende Charaktere"
            value={store.selectedID}
            onChange={(e) => store.selectCharacter(e.currentTarget.value)}
          >
            <option value="">----</option>
            {store.characters.map((character) => (
              <option value={character.id} key={character.id}>
                {character.name}
              </option>
            ))}
          </Select>

          <div className="h-px bg-gray-200 my-7"></div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (name) {
                const char = store.createCharacter(name);
                store.selectCharacter(char.id);
                setName('');
                setOpen(false);
              }
            }}
          >
            <Input
              value={name}
              label="Charakter Name"
              onChange={(e) => setName(e.currentTarget.value)}
            />

            <div className="flex gap-4 mt-5">
              <Button className="w-full" type="submit" color="green">
                Charakter erstellen
              </Button>
              {store.selectedID && (
                <Button className="w-full" color="red">
                  {t('cancel')}
                </Button>
              )}
            </div>
          </form>
        </>
      </Modal>
      {store.selectedID && <Character />}
    </>
  );
});
