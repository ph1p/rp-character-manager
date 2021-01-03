import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { addSignToNumber } from '../../../utils/helpers';
import { useCharacterStore } from '../../../store';


export const SavingThrowsComponent = observer(() => {
  const character = useCharacterStore();
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-2xl mb-3">{t('saving-throws')}</h3>
      <div className="grid gap-2">
        {character.attributes.values.map((attribute) => (
          <div
            className="text-center border-gray-100 border bg-gray-50 rounded p-2"
            key={attribute.name}
          >
            <div className="uppercase text-xs">
              {t(`attribute.${attribute.name}`)}
            </div>
            <div
              className={`text-2xl font-bold px-2 my-2 ${
                attribute.isSavingThrow ? 'bg-green-500' : 'bg-gray-500'
              } text-white inline-block rounded`}
            >
              {addSignToNumber(attribute.savingThrow(character.id))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
