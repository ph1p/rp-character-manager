import { useTranslation } from 'react-i18next';
import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';

import { CharacterNote } from '../../../store/note';
import { useCharacterStore } from '../../../store';
import { Textarea } from '../../../components/Textarea';
import { PencilIcon } from '../../../components/icons/Pencil';

const NoteItem: FunctionComponent<{
  note: CharacterNote;
}> = observer(({ note }) => {
  const { t } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState(note.text);

  return (
    <div className="cursor-pointer w-full border-gray-100 rounded border-b mb-2 last:border-0 last:-mb-2">
      <div className="flex w-full items-center py-2 border-transparent relative">
        {!edit && (
          <div
            onClick={() => setEdit(true)}
            className="h-4 w-4 ml-2 mr-3 absolute top-2 right-0"
          >
            <PencilIcon />
          </div>
        )}
        <div className="w-full">
          <div>
            {!edit ? (
              note.text.split('\n').map((item, key) => {
                return (
                  <span key={key}>
                    {item}
                    <br />
                  </span>
                );
              })
            ) : (
              <Textarea
                label="Name"
                className="w-full -mt-1"
                defaultValue={newText}
                onChange={(e) => setNewText(e.currentTarget.value)}
              />
            )}
          </div>
          <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
            {!edit && (
              <p className="text-xs mt-2">
                {format(note.date, 'dd.MM.yyyy - HH:mm')}
              </p>
            )}
          </div>
        </div>
      </div>
      {edit && (
        <div className="flex mb-3">
          <button
            className="mr-3 bg-green-500 text-white py-1 px-3 text-xs rounded"
            onClick={() => {
              setEdit(false);
              if (newText) {
                note.setText(newText);
              }
            }}
          >
            {t('save')}
          </button>

          <button
            className="bg-gray-400 text-white py-1 px-3 text-xs rounded"
            onClick={() => setEdit(false)}
          >
            {t('cancel')}
          </button>
          <button
            className="ml-auto bg-red-700 text-white py-1 px-3 text-xs rounded"
            onClick={() => window.confirm('Wirklich?') && note.remove()}
          >
            {t('remove')}
          </button>
        </div>
      )}
    </div>
  );
});

export const NotesComponent = observer(() => {
  const { t } = useTranslation();
  const store = useCharacterStore();
  const [text, setText] = useState<string>('');

  const addNote = (e: SyntheticEvent) => {
    e.preventDefault();
    store.notes.create(text);
    setText('');
  };

  return (
    <div>
      <h2 className="text-xl mb-2">{t('notes.plural')}</h2>
      <div
        style={{ maxHeight: 300 }}
        className="overflow-y-auto mb-5 border-b-2 pb-5 border-gray-100"
      >
        {store.notes.values.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>

      <form className="w-full max-w-lg" onSubmit={addNote}>
        <div className="flex gap-3">
          <Textarea
            label={t('notes.singular')}
            className="flex-grow w-24"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full mr-5 bg-blue-700 text-white py-2 px-6 text-sm rounded"
        >
          {t('notes.add-note')}
        </button>
      </form>
    </div>
  );
});