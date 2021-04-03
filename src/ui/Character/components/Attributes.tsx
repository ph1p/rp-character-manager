import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { addSignToNumber } from '../../../utils/helpers';
import { useCharacterStore } from '../../../store';
import { Input } from '../../../components/Input';
import { Checkbox } from '../../../components/Checkbox';

export const AttributesComponent = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-2xl mb-3">Attribute</h3>
      <div className="grid gap-2">
        {character.attributes.values.map((attribute, i) => (
          <div
            className="text-center border-gray-100 border bg-gray-50 rounded p-2"
            key={i}
          >
            <div className="uppercase text-xs">
              {t(`attribute.${attribute.name}`)}
            </div>
            <div className="text-2xl font-bold px-2 my-2 bg-green-500 text-white inline-block rounded">
              {addSignToNumber(attribute.modifier)}
            </div>
            {character.editMode ? (
              <Input
                className="mb-2"
                type="text"
                placeholder="Score..."
                defaultValue={attribute.score}
                onInput={(e) => attribute.setScore(e.currentTarget.value)}
              />
            ) : (
              <div>{attribute.score}</div>
            )}
            {character.editMode && (
              <Input
                className="mb-2"
                type="text"
                label="Extra-Score"
                defaultValue={attribute.extraScore}
                onInput={(e) => attribute.setExtraScore(e.currentTarget.value)}
              />
            )}
            {character.editMode && (
              <Checkbox
                label={t('saving-throw')}
                checked={attribute.isSavingThrow}
                onChange={() => attribute.toggleSaveThrow()}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
