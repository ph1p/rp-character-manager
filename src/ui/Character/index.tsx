import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { CharacterStore } from '../../store/character';
import { useCharacterStore, useStore } from '../../store';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { Arrowleft } from '../../components/icons/ArrowLeft';
import { ContentBox } from '../../components/ContentBox';
import { Button } from '../../components/Button';

import { SkillsComponent } from './components/Skills';
import { SavingThrowsComponent } from './components/SavingThrows';
import { NotesComponent } from './components/Notes';
import { InventoryComponent } from './components/Inventory';
import { HitpointsComponent } from './components/Hitpoints';
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

const ProficiencyBonusComponent = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();

  return (
    <>
      {character.editMode ? (
        <Input
          className="mr-4 w-full lg:w-44"
          type="text"
          label={t('proficiency-bonus')}
          defaultValue={character.proficiencyBonus}
          onInput={(e) =>
            character.setProficiencyBonus(parseInt(e.currentTarget.value, 10))
          }
        />
      ) : (
        <CharacterValue
          value={character.proficiencyBonus}
          description={t('proficiency-bonus')}
        />
      )}
    </>
  );
});

const CharacterValue = (props: any) => (
  <div className="mr-4">
    <span className="text-xl">{props.value}</span>
    {props.description && (
      <p className="text-gray-500 text-sm uppercase">{props.description}</p>
    )}
  </div>
);

const InitiativeComponent = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();

  return (
    <>
      {character.editMode ? (
        <Input
          className="mr-4 w-full lg:w-44 lg:mb-0"
          type="text"
          label={t('initiative')}
          defaultValue={character.initiative}
          onInput={(e) =>
            character.setInitiative(parseInt(e.currentTarget.value, 10))
          }
        />
      ) : (
        <CharacterValue
          value={character.initiative}
          description={t('initiative')}
        />
      )}
    </>
  );
});

const ArmorClassComponent = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();

  return (
    <>
      {character.editMode ? (
        <Input
          className="mr-4 w-full lg:w-44 lg:mb-0"
          type="text"
          label={t('armor-class')}
          defaultValue={character.armorClass}
          onInput={(e) =>
            character.setArmorClass(parseInt(e.currentTarget.value, 10))
          }
        />
      ) : (
        <CharacterValue
          value={character.armorClass}
          description={t('armor-class')}
        />
      )}
    </>
  );
});

const MovementComponent = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();

  return (
    <>
      {character.editMode ? (
        <Input
          className="mr-4 w-full lg:w-44"
          type="text"
          label={t('movement')}
          defaultValue={character.movement}
          onInput={(e) =>
            character.setMovement(parseInt(e.currentTarget.value, 10))
          }
        />
      ) : (
        <CharacterValue
          value={character.movement}
          description={t('movement')}
        />
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
  const { t } = useTranslation();
  const character = useCharacterStore();
  const [openNotes, setNotesOpen] = useState(false);

  if (!character.name) {
    return null;
  }

  return (
    <>
      <Modal
        className="w-5/6 lg:w-1/2"
        open={openNotes}
        onClose={() => setNotesOpen(!openNotes)}
      >
        <NotesComponent />
      </Modal>

      <div className="top-0 flex w-full bg-white lg:shadow-sm lg:sticky">
        <div className="w-full lg:flex">
          <Link
            to="/"
            className="self-center w-full p-5 text-xl border-b lg:border-b-0 lg:w-auto lg:border-r lg:px-5 lg:py-3 lg:mr-5 hover:text-green-500 flex"
          >
            <Arrowleft width="18" className="inline-block mr-2" />
            Home
          </Link>

          <div className="grid gap-4 grid-cols-2 p-4 w-full items-center lg:gap-0 lg:py-3 lg:px-0 lg:flex lg:h-full">
            <ArmorClassComponent />
            <InitiativeComponent />
            <MovementComponent />
            <ProficiencyBonusComponent />

            <div
              className="flex lg:mt-0 lg:ml-auto"
              style={{ gridColumn: '2 span' }}
            >
              <Button
                className="w-full lg:w-auto"
                onClick={() => setNotesOpen(true)}
                color="yellow"
              >
                {t('notes.plural')} ({character.notes.values.length})
              </Button>
              <Button
                filled
                className="w-full mx-0 ml-4 lg:mx-4 lg:w-auto"
                color={character.editMode ? 'green' : 'gray'}
                onClick={() => character.toggleEditMode()}
              >
                {t(character.editMode ? 'ready' : 'edit')}
              </Button>
            </div>
          </div>
        </div>
      </div>
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
