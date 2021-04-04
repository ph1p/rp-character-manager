import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import { CharacterStore } from '../../store/character';
import { useCharacterStore } from '../../store';
import { CharacterClassType, defaultClasses } from '../../data/character';
import { Select } from '../../components/Select';
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

      <div className="mt-5">
        {character.editMode ? (
          <Select
            value={character.class}
            onInput={(e) =>
              character.setClass(e.currentTarget.value as CharacterClassType)
            }
          >
            <option value="custom">{t('character.type.custom')}</option>
            {defaultClasses.map((charClass) => (
              <option value={charClass.type}>
                {t(`character.type.${charClass.type}`)}
              </option>
            ))}
          </Select>
        ) : (
          <div>
            <div className="uppercase text-gray-400">{t('class')}</div>
            <div className="text-3xl appearance-none bg-transparent w-full lg:w-auto">
              {t(`character.type.${character.class}`)}
            </div>
            <div className="border-t pt-4 mt-4">
              <div>
                <strong>{t('passive-wisdom')}:</strong>{' '}
                {character.passiveWisdom}
              </div>
              {character.classDetails && (
                <>
                  <div>
                    <strong>{t('hit-die')}: </strong>
                    {character.classDetails?.dice}
                  </div>
                  <div>
                    <strong>{t('primary-attribute')}: </strong>
                    {character.classDetails?.primaryAttribute
                      .map((a) => t(`attribute.${a}`))
                      .join(', ')}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
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
    <ContentBox className="mt-4">
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
          <div className="flex flex-col">
            <ContentBox className="mb-4">
              <NameComponent />
            </ContentBox>
            <ContentBox className="mb-4">
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

            <DownloadComponent />
          </div>
        </>
      </div>
    </>
  );
});
