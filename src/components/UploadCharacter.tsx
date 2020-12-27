import React, { useEffect, useState } from 'react';

import { CharacterStore } from '../store/character';
import { useStore } from '../store';

import { Input } from './Input';

export const UploadComponent = () => {
  const store = useStore();

  const [data, setData] = useState<CharacterStore>();

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
    }
  }, [data, store]);

  const handleChange = (e: any) => {
    var reader = new FileReader();
    try {
      reader.readAsText(e.target.files[0], 'UTF-8');
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
  };

  return <Input type="file" accept=".json,.txt" onChange={handleChange} />;
};
