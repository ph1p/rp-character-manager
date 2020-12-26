import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useCharacterStore, useStore } from '../../store';
import { NotesComponent } from '../../components/Notes';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { SkillsComponent } from './components/Skills';
import { InventoryComponent } from './components/Inventory';
import { HitpointsComponent } from './components/Hitpoints';
import { AttributesComponent } from './components/Attributes';

const NameComponent = observer(() => {
  const store = useStore();
  const character = useCharacterStore();

  return (
    <>
      {character.editMode ? (
        <Input
          className="mr-4 w-24 ml-4 sm:ml-0"
          type="text"
          label="Name"
          defaultValue={character.name}
          onInput={(e) => character.setName(e.currentTarget.value)}
        />
      ) : (
        <div className="text-xl appearance-none cursor-pointer bg-green-600 text-white -mt-3 sm:-my-3 py-6 px-4 sm:mr-4">
          <select
            className="text-xl appearance-none cursor-pointer bg-transparent w-full sm:w-auto"
            value={store.selectedID}
            onChange={(e) => store.selectCharacter(e.currentTarget.value)}
          >
            <option value="">----</option>
            {store.characters.map((character) => (
              <option value={character.id} key={character.id}>
                {character.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
});

const SavingThrowsComponent = observer(() => {
  const { t } = useTranslation();
  const store = useCharacterStore();

  return (
    <div>
      <h3 className="text-2xl mb-3">{t('saving-throws')}</h3>
      <div className="grid gap-2">
        {store.attributes.values.map((attribute) => (
          <div
            className="text-center border-gray-100 border bg-gray-50 rounded p-2"
            key={attribute.name}
          >
            <div className="uppercase text-xs">
              {t(`attribute.${attribute.name}`)}
            </div>
            <div
              className={`text-2xl font-bold px-2 my-2 bg-${
                attribute.isSavingThrow ? 'green' : 'gray'
              }-500 text-white inline-block rounded`}
            >
              {attribute.savingThrow}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

const ProficiencyBonusComponent = observer(() => {
  const { t } = useTranslation();
  const store = useCharacterStore();

  return (
    <>
      {store.editMode ? (
        <Input
          className="w-44 mr-4"
          type="text"
          label={t('proficiency-bonus')}
          defaultValue={store.proficiencyBonus}
          onInput={(e) =>
            store.setProficiencyBonus(parseInt(e.currentTarget.value, 10))
          }
        />
      ) : (
        <CharacterValue
          value={store.proficiencyBonus}
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
  const { t } = useTranslation();
  const store = useCharacterStore();

  return (
    <>
      {store.editMode ? (
        <Input
          className="w-44 mr-4"
          type="text"
          label={t('initiative')}
          defaultValue={store.initiative}
          onInput={(e) =>
            store.setInitiative(parseInt(e.currentTarget.value, 10))
          }
        />
      ) : (
        <CharacterValue
          value={store.initiative}
          description={t('initiative')}
        />
      )}
    </>
  );
});

const ArmorClassComponent = observer(() => {
  const { t } = useTranslation();
  const store = useCharacterStore();

  return (
    <>
      {store.editMode ? (
        <Input
          className="w-44 mr-4"
          type="text"
          label={t('armor-class')}
          defaultValue={store.armorClass}
          onInput={(e) =>
            store.setArmorClass(parseInt(e.currentTarget.value, 10))
          }
        />
      ) : (
        <CharacterValue
          value={store.armorClass}
          description={t('armor-class')}
        />
      )}
    </>
  );
});

const MovementComponent = observer(() => {
  const { t } = useTranslation();
  const store = useCharacterStore();

  return (
    <>
      {store.editMode ? (
        <Input
          className="w-44 mr-4"
          type="text"
          label={t('movement')}
          defaultValue={store.movement}
          onInput={(e) =>
            store.setMovement(parseInt(e.currentTarget.value, 10))
          }
        />
      ) : (
        <CharacterValue value={store.movement} description={t('movement')} />
      )}
    </>
  );
});

const RemoveCharacter = observer(() => {
  const store = useStore();
  const character = useCharacterStore();

  return (
    <>
      {character.editMode && (
        <div className="bg-white p-5 rounded-md mt-5">
          <Button
            type="submit"
            onClick={() => {
              if (window.confirm('Wirklich?')) {
                store.removeCharacter(store.selectedID);
                store.selectCharacter('');
              }
            }}
            full
            color="red"
          >
            Charakter löschen
          </Button>
        </div>
      )}
    </>
  );
});

export const Character = observer(() => {
  const { t } = useTranslation();
  const character = useCharacterStore();
  const [openNotes, setNotesOpen] = useState(false);

  return (
    <>
      <Modal open={openNotes} onClose={() => setNotesOpen(!openNotes)}>
        <NotesComponent />
      </Modal>

      <div className="sm:sticky top-0 flex w-full bg-white sm:px-5 py-3">
        <div className="sm:flex w-full">
          <NameComponent />
          <div className="sm:grid p-4 lg:p-0 lg:flex h-full w-full items-center">
            <ArmorClassComponent />
            <InitiativeComponent />
            <MovementComponent />
            <ProficiencyBonusComponent />

            <div className="flex ml-auto mt-4 sm:mt-0">
              <Button onClick={() => setNotesOpen(true)} color="yellow">
                Notizen ({character.notes.values.length})
              </Button>
              <Button
                filled
                className="ml-3"
                color={character.editMode ? 'green' : 'gray'}
                onClick={() => character.toggleEditMode()}
              >
                {character.editMode ? t('ready') : t('edit')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <>
          <div className="flex flex-col gap-4">
            <div className="bg-white p-5 rounded-md">
              <HitpointsComponent />
            </div>
            <div className="grid grid-cols-2 gap-4 bg-white p-5 rounded-md">
              <AttributesComponent />
              <SavingThrowsComponent />
            </div>
          </div>
          <div>
            <SkillsComponent />
          </div>
          <div>
            <InventoryComponent />
            <RemoveCharacter />
          </div>
        </>
      </div>
    </>
  );
});
