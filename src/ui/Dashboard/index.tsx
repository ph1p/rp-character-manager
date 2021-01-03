import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { UploadComponent } from '../../components/UploadCharacter';
import { Input } from '../../components/Input';
import { ContentBox } from '../../components/ContentBox';
import { Button } from '../../components/Button';

export const Dashboard = observer(() => {
  const history = useHistory();
  const { t } = useTranslation();
  const store = useStore();
  const [name, setName] = useState('');

  return (
    <div className="flex flex-wrap content-center h-full">
      <ContentBox className="w-11/12 lg:w-2/5 m-auto self-center">
        <UploadComponent />

        <div className="h-px bg-gray-200 my-7"></div>

        <div className="mt-7">
          {store.characters.map((character) => (
            <div className="flex w-full mb-2" key={character.id}>
              <Link
                to={`/character/${character.id}`}
                className="flex w-full items-center py-2 px-3 cursor-pointer justify-between bg-gray-100 hover:bg-gray-200 rounded-l"
                onClick={() => store.selectCharacter(character.id)}
              >
                <div>{character.name}</div>
                <div className="text-xs text-gray-400 self-center">
                  HP: {character.hitpoints}/{character.maxHitpoints} | Lvl:{' '}
                  {character.level}
                </div>
              </Link>
              <div
                onClick={() => {
                  if (window.confirm(t('character-delete-confirm'))) {
                    store.removeCharacter(character.id);
                  }
                }}
                className="bg-red-300 hover:bg-red-500 text-white rounded-r text-center p-3 px-5 font-bold select-none cursor-pointer"
              >
                x
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
              history.push(`/character/${char.id}`);
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
              {t('create-character')}
            </Button>
          </div>
        </form>
      </ContentBox>
    </div>
  );
});
