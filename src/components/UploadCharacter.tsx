import React, { ChangeEvent, useEffect, useState } from 'react';

import { CharacterStore } from '../store/character';
import { useStore } from '../store';

export const UploadComponent = () => {
  const store = useStore();

  const [data, setData] = useState<CharacterStore>();
  const [created, setCreated] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
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
        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-green-500 text-sm">
          <span className="inline-block align-middle mr-8">
            Successfully created
          </span>
          <button
            className="absolute bg-transparent text-xl font-semibold leading-none right-0 top-0 mt-4 mr-5 outline-none focus:outline-none"
            onClick={() => setCreated(false)}
          >
            <span>×</span>
          </button>
        </div>
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
          <span className="ml-2">Upload character file</span>
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
