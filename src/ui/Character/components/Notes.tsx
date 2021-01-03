import { useTranslation } from 'react-i18next';
import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';

import { CharacterNote } from '../../../store/note';
import { useCharacterStore } from '../../../store';
import { Textarea } from '../../../components/Textarea';
import { PencilIcon } from '../../../components/icons/Pencil';
import { Button } from '../../../components/Button';

const NoteItem: FunctionComponent<{
  note: CharacterNote;
  remove: (id: string) => void;
}> = observer((props) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState(props.note.text);

  return (
    <div className="cursor-pointer w-full border-gray-100 rounded border-b mb-2 last:border-0 last:-mb-2">
      <div
        className="flex w-full items-center py-2 border-transparent relative"
        onClick={() => !edit && setEdit(true)}
      >
        {!edit && (
          <div className="h-4 w-4 ml-2 mr-3 absolute top-2 right-0">
            <PencilIcon />
          </div>
        )}
        <div className="w-full">
          <div>
            {!edit ? (
              props.note.text.split('\n').map((item, key) => {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                );
              })
            ) : (
              <Textarea
                rows={5}
                className="w-full -mt-1"
                defaultValue={newText}
                onChange={(e) => setNewText(e.currentTarget.value)}
              />
            )}
          </div>
          <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
            {!edit && (
              <p className="text-xs mt-2">
                {format(props.note.date, 'dd.MM.yyyy - HH:mm')}
              </p>
            )}
          </div>
        </div>
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
              if (newText) {
                props.note.setText(newText);
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
              window.confirm(t('notes.delete-confirm')) &&
              props.remove(props.note.id)
            }
          >
            {t('remove')}
          </Button>
        </div>
      )}
    </div>
  );
});

export const NotesComponent = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();
  const [text, setText] = useState<string>('');

  const addNote = (e: SyntheticEvent) => {
    e.preventDefault();
    character.notes.create(text);
    setText('');
  };

  return (
    <>
      <h2 className="text-xl mb-2">{t('notes.plural')}</h2>
      <div
        style={{ maxHeight: 300 }}
        className="overflow-y-auto mb-5 border-b-2 pb-5 border-gray-100"
      >
        {character.notes.values
          .slice()
          .sort((b, a) => a.date - b.date)
          .map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              remove={(id) => character.notes.remove(id)}
            />
          ))}
      </div>

      <form className="w-full" onSubmit={addNote}>
        <Textarea
          rows={5}
          label={t('notes.singular')}
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />

        <Button type="submit" full filled color="yellow">
          {t('notes.add-note')}
        </Button>
      </form>
    </>
  );
});
