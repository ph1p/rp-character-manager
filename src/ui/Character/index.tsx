import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { CharacterStore } from '../../store/character';
import { useCharacterStore, useStore } from '../../store';
import { Input } from '../../components/Input';
import { ContentBox } from '../../components/ContentBox';
import { Button } from '../../components/Button';

import { SkillsComponent } from './components/Skills';
import { SavingThrowsComponent } from './components/SavingThrows';
import { InventoryComponent } from './components/Inventory';
import { HitpointsComponent } from './components/Hitpoints';
import { Header } from './components/Header';
import { AttributesComponent } from './components/Attributes';

export const NameComponent = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();

  return (
    <>
      {character.editMode ? (
        <Input
          type="text"
          label="Name"
          defaultValue={character.name}
          onInput={(e) => character.setName(e.currentTarget.value)}
        />
      ) : (
        <div>
          <div className="uppercase text-gray-400">{t('name')}</div>
          <div className="text-3xl appearance-none bg-transparent w-full lg:w-auto">
            {character.name}
          </div>
        </div>
      )}
    </>
  );
});

const RemoveCharacter = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();
  const history = useHistory();

  const store = useStore();

  return (
    <>
      {character.editMode && (
        <ContentBox className="mt-5">
          <Button
            type="submit"
            onClick={() => {
              if (window.confirm(t('character-delete-confirm'))) {
                store.removeCharacter(character.id);
                history.push('/');
              }
            }}
            full
            color="red"
          >
            Charakter löschen
          </Button>
        </ContentBox>
      )}
    </>
  );
});

const DownloadComponent = () => {
  const character = useCharacterStore();
  const { t } = useTranslation();

  const downloadCharacter = (character: CharacterStore) => {
    const data = `data:${`text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(toJS(character))
    )}`}`;
    const anchor = document.createElement('a');
    anchor.href = 'data:' + data;
    anchor.download = `${character.id}.json`;
    anchor.click();
    anchor.remove();
  };

  return (
    <ContentBox className="mt-5">
      <Button full onClick={() => downloadCharacter(character)}>
        {t('download-character')}
      </Button>
    </ContentBox>
  );
};

export const Character = observer(() => {
  const character = useCharacterStore();

  if (!character.name) {
    return null;
  }

  return (
    <>
      <Header />

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-3">
        <>
          <div className="flex flex-col gap-4">
            <ContentBox>
              <NameComponent />
            </ContentBox>
            <ContentBox>
              <HitpointsComponent />
            </ContentBox>
            <ContentBox className="grid grid-cols-2 gap-4">
              <AttributesComponent />
              <SavingThrowsComponent />
            </ContentBox>
          </div>
          <div>
            <SkillsComponent />
          </div>
          <div>
            <InventoryComponent />
            <RemoveCharacter />

            <DownloadComponent />
          </div>
        </>
      </div>
    </>
  );
});
