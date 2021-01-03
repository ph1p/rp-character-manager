import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Character } from './ui/Character';
import { useStore } from './store';
import { UploadComponent } from './components/UploadCharacter';
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
          <UploadComponent />

          <div className="mt-7">
            {store.characters.map((character) => (
              <div
                className="flex py-2 px-3 cursor-pointer justify-between bg-gray-100 hover:bg-gray-200 mb-2 rounded"
                key={character.id}
                onClick={() => store.selectCharacter(character.id)}
              >
                <div>{character.name}</div>
                <div className="text-xs text-gray-400 self-center">
                  HP: {character.hitpoints}/{character.maxHitpoints} | Lvl:{' '}
                  {character.level}
                </div>
              </div>
            ))}
          </div>

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
