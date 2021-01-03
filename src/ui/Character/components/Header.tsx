import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useCharacterStore } from '../../../store';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';
import { Arrowleft } from '../../../components/icons/ArrowLeft';
import { Button } from '../../../components/Button';

import { NotesComponent } from './Notes';

const CharacterValue = (props: any) => (
  <div className="mr-4">
    <span className="text-xl">{props.value}</span>
    {props.description && (
      <p className="text-gray-500 text-sm uppercase">{props.description}</p>
    )}
  </div>
);

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

const HeaderElements = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();

  const headerValues = [
    {
      name: 'armor-class',
      value: character.armorClass,
      method: (value: any) => character.setArmorClass(parseInt(value, 10)),
    },
    {
      name: 'movement',
      value: character.movement,
      method: (value: any) => character.setMovement(parseInt(value, 10)),
    },
    {
      name: 'proficiency-bonus',
      value: character.proficiencyBonus,
      method: (value: any) =>
        character.setProficiencyBonus(parseInt(value, 10)),
    },
    {
      name: 'initiative',
      value: character.initiative,
      method: (value: any) => character.setInitiative(parseInt(value, 10)),
    },
  ];

  return (
    <>
      {headerValues.map((el) => (
        <React.Fragment key={el.name}>
          {character.editMode ? (
            <Input
              className="mr-4 w-full lg:w-44 lg:mb-0"
              type="text"
              label={t(el.name)}
              defaultValue={el.value}
              onInput={(e) => el.method(e.currentTarget.value)}
            />
          ) : (
            <CharacterValue value={el.value} description={t(el.name)} />
          )}
        </React.Fragment>
      ))}
    </>
  );
});

export const Header = observer(() => {
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
            <Arrowleft
              width="18"
              height="18"
              className="inline-block mr-2 self-center"
            />
            Home
          </Link>

          <div className="grid gap-4 grid-cols-2 p-4 w-full items-center lg:gap-0 lg:py-3 lg:px-0 lg:flex lg:h-full">
            <HeaderElements />

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
    </>
  );
});
