import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import Ajv, { ErrorObject } from 'ajv';

import { CharacterStore } from '../store/character';
import { useStore } from '../store';
import schema from '../data/json-schema';
import { Notification } from '../components/Notification';

const validate = new Ajv().compile(schema);

export const UploadComponent = () => {
  const store = useStore();

  const { t } = useTranslation();

  const [data, setData] = useState<CharacterStore>();
  const [errors, setErrors] = useState<ErrorObject[] | null>();
  const [created, setCreated] = useState<boolean>(false);

  useEffect(() => {
    if (data && validate(data)) {
      const char = store.createCharacter(data.name);

      char.setArmorClass(data.armorClass);
      char.setHitpoints(data.hitpoints);
      char.setInitiative(data.initiative);
      char.setLevel(data.level);
      char.setMaxHitpoints(data.maxHitpoints);
      char.setMovement(data.movement);
      char.setProficiencyBonus(data.proficiencyBonus);

      for (const note of data.notes.values) {
        char.notes.create(note.text, note.date, note.id);
      }

      for (const item of data.inventory.items) {
        char.inventory.createItem(item);
      }

      setCreated(true);
      setData(undefined);
    } else {
      setErrors(validate.errors);
    }
  }, [data, store]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      var reader = new FileReader();
      try {
        reader.readAsText(e.target?.files[0], 'UTF-8');
        reader.onload = function (evt: any) {
          try {
            setData(JSON.parse(evt.target.result));
          } catch {
            console.log('ERROR');
          }
        };
        reader.onerror = function (evt) {
          console.log('error');
        };
      } catch {}
    }

    e.target.value = '';
  };

  return (
    <>
      {created && (
        <Notification color="green" onClose={() => setCreated(false)}>
          {t('upload.success')}
        </Notification>
      )}
      {errors && (
        <Notification color="red" onClose={() => setErrors(null)}>
          {errors.map((e) => (
            <div key={e.dataPath}>
              {e.dataPath} : {e.message}
              <br />
            </div>
          ))}
        </Notification>
      )}
      <div className="overflow-hidden relative w-full">
        <button className="bg-green-500 rounded hover:bg-green-400 text-white py-2 px-4 w-full inline-flex items-center text-sm focus:outline-none">

          <svg
            fill="#FFF"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
          </svg>
          <span className="ml-2">{t('upload.file')}</span>
        </button>
        <input
          className="cursor-pointer absolute block opacity-0 top-0 bottom-0 w-auto"
          type="file"
          name="vacancyImageFiles"
          accept=".json,.txt"
          onChange={(e) => handleChange(e)}
        />
      </div>
    </>
  );
};
